class Admin::PostController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :check_commit_type, only: [:index]
  before_action do
    basic_auth
    @settings = load_setting
  end

  def check_commit_type
    params.reject!{ |_, value| value == '' } # valueが空のパラメータは削除
    commit = params[:commit]

    if commit == 'bulk_operation'
      bulk(params[:posts][:action], params[:posts][:selector])
    elsif commit == 'filter'
      redirect_to admin_post_path(:status => params[:status], :category_id => params[:category_id], :tag_id => params[:tag_id], :user_id => params[:user_id]),notice: '絞り込みを実行しました' and return
    end
  end

  def search_string(params)
    str = []

    case params[:status]
      when 'publish'
        str.push("published_at <= '#{DateTime.now}'")
      when 'future'
        params[:status] = 'publish'
        str.push("published_at > '#{DateTime.now}'")
    end

    params.keys.each do |val|
      str.push("#{val} = '#{params[val]}'")
    end

    str.join(' and ')
  end

  def index
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)
    valid_params = params.permit(:status, :category_id, :user_id)

    if valid_params.empty? && params[:tag_id].nil?
      posts = Post.eager_load(:thumbnail, :category, :post_option).preload(:tags).all
    else
      if params[:tag_id].nil?
        posts = Post.eager_load(:thumbnail, :category, :post_option).preload(:tags).where(search_string(valid_params))
      else
        # 存在しないtag_idだったらnilやで
        tag = Tag.find_by(:id => params[:tag_id])
        tag_related_posts = tag.nil? ? nil : tag.posts

        # 存在しないtag_idまたはtagに関連する記事がない場合だったらnilやで
        posts = tag_related_posts.nil? ? [] : tag_related_posts.eager_load(:thumbnail, :category, :post_option).preload(:tags).where(search_string(valid_params))
      end
    end

    @post_count = posts.length
    @posts = @post_count == 0 ? [] : posts.limit(@per_page).offset(offset).order(:created_at => 'DESC')
  end

  def edit
    @post = Post.find_by(:id => params[:post_id])

    # 不正なpost_idの場合は新規記事投稿のページへ転送
    if @post.nil?
      redirect_to admin_post_new_path
    end

    @option = @post.post_option
  end

  def new
    @post = Post.new
    @option = PostOption.new
  end

  def create
    post_attribute = post_params
    option_attribute = option_params
    publish_datetime = post_date_params.empty? ? DateTime.now : Time.parse("#{post_date_params[:date]} #{post_date_params[:hour]}:#{post_date_params[:munite]}")
    tag_ids = params[:post][:tag] || []
    media_ids = params[:post][:media] || []
    post_attribute[:published_at] = publish_datetime

    ActiveRecord::Base.transaction do
      @post = Post.new(post_attribute)

      if @post.save
        option_attribute[:post_id] = @post.id
        @option = PostOption.new(option_attribute)

        unless @option.save
          @post.errors.merge!(@option.errors)
          raise ActiveRecord::RecordInvalid.new(PostOption.new)
        end

        ThumbnailRelation.create!({
          post_id: @post.id,
          medium_id: @post.thumbnail_id
        })

        TaxonomyRelation.create!({
            post_id: @post.id,
            category_id: @post.category_id
        })

        MediumRelation.create!({
          post_id: @post.id,
          medium_id: @post.thumbnail_id,
          is_thumbnail: true
        })

        tag_ids.each do |tag_id|
          TaxonomyRelation.create!({
            post_id: @post.id,
            tag_id: tag_id
          })
        end

        media_ids.each do |media_id|
          MediumRelation.create!({
            post_id: @post.id,
            medium_id: media_id,
            is_thumbnail: false
          })
        end
      else
        @option = PostOption.new(option_attribute)
        @post.errors.merge!(@option.errors) if @option.invalid?
        raise ActiveRecord::RecordInvalid.new(Post.new)
      end
    end
      redirect_to admin_post_edit_path(:post_id => @post.id), notice: '記事を投稿しました'
    rescue
      session[:user_id] = post_attribute[:user_id]
      flash.now[:error] = '投稿に失敗しました'
      render :new
  end

  def update
    @post = Post.find_by(:id => params[:post_id])

    redirect_to admin_post_path, alert: '予期せぬエラーが発生しました' and return if @post.nil?

    @option = PostOption.find_by(:post_id => @post.id)
    @category = TaxonomyRelation.find_by(:post_id => @post.id, :category_id => @post.category_id)
    @thumbnail = ThumbnailRelation.find_by(post_id: @post.id)
    post_attribute = post_params
    tag_ids = params[:post][:tag] || []
    media_ids = params[:post][:media] || []

    if post_attribute[:status] == 'future'
      post_attribute[:published_at] = Time.parse("#{post_date_params[:date]} #{post_date_params[:hour]}:#{post_date_params[:munite]}")
    elsif @post[:status] != 'publish' && post_attribute[:status] == 'publish'
      post_attribute[:published_at] = DateTime.now
    end

    ActiveRecord::Base.transaction do
      if @post.update(post_attribute)
        unless @option.update(option_params)
          @post.errors.merge!(@option.errors)
          raise ActiveRecord::RecordInvalid.new(PostOption.new)
        end

        if @thumbnail.nil? && !@post.thumbnail_id.nil?
          ThumbnailRelation.new({ post_id: @post.id, medium_id: @post.thumbnail_id }).save!
          MediumRelation.create!({ post_id: @post.id, medium_id: @post.thumbnail_id, is_thumbnail: true })
        elsif !@thumbnail.nil?
          @thumbnail.update!({ medium_id: @post.thumbnail_id })
          MediumRelation.create!({ post_id: @post.id, medium_id: @post.thumbnail_id, is_thumbnail: true })
        end

        @category.update!({ category_id: @post.category_id })

        @post.tags.each do |tag|
          TaxonomyRelation.find_by({ post_id: @post.id, tag_id: tag.id }).delete
        end

        @post.media.each do |medium|
          MediumRelation.find_by({ post_id: @post.id, medium_id: medium.id }).delete
        end

        tag_ids.each do |tag_id|
          TaxonomyRelation.create!({ post_id: @post.id, tag_id: tag_id })
        end

        media_ids.each do |media_id|
          MediumRelation.create!({ post_id: @post.id, medium_id: media_id, is_thumbnail: false })
        end
      else
        @post.errors.merge!(@option.errors) if !@option.update(option_params)
        raise ActiveRecord::RecordInvalid.new(Post.new)
      end
    end
      redirect_to admin_post_edit_path(:post_id => params[:post_id]), notice: '更新しました'
    rescue
      session[:user_id] = params[:current_user_id]
      flash.now[:error] = '更新に失敗しました'
      render :edit
  end

  def destory
    @post = Post.find_by(:id => params[:post_id])

    unless @post.nil?
      @post.tags.each do |tag|
        TaxonomyRelation.find_by(:post_id => @post.id, :tag_id => tag.id).delete
      end
      @post.media.each do |medium|
        MediumRelation.find_by(:post_id => @post.id, :medium_id => medium.id).delete
      end

      TaxonomyRelation.find_by(:post_id => @post.id, :category_id => category_id.id).delete
      @post.post_option.delete
      @post.delete
    end

    redirect_to admin_post_path, notice: '削除しました。'
  end

  def bulk(action, post_ids)
    if post_ids.nil?
      redirect_to admin_post_path, alert: '対象の記事を選択してください' and return
    elsif action == ''
      redirect_to admin_post_path, alert: '一括操作を選択して実行してください' and return
    end

    post_ids.each do |id|
      post = Post.find_by(:id => id)

      next if post.nil?

      if action == 'delete'
        post.tags.each do |tag|
          TaxonomyRelation.find_by(:post_id => id, :tag_id => tag.id).delete
        end
        post.media.each do |medium|
          MediumRelation.find_by(:post_id => id, :medium_id => medium.id).delete
        end

        post.post_option.delete
        post.delete

        next
      end

      post.update(:status => action)
    end

    redirect_to admin_post_path, notice: '一括操作を実行しました'
  end

  def image_format(image)
    ImageProcessing::MiniMagick.source(image).resize_to_fit(480, 300).call
  end

  def post_params
    params.require(:post).permit(:user_id, :category_id, :thumbnail_id, :postname, :title, :content, :status)
  end

  def post_date_params
    params.require(:post).permit(:date, :hour, :munite)
  end

  def option_params
    params.require(:post_option).permit(:post_id, :description, :canonical, :noindex, :nofollow)
  end
end
