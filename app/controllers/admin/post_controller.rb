class Admin::PostController < ApplicationController
  protect_from_forgery
  before_action :check_commit_type, only: [:index]
  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def check_commit_type
    params.reject!{ |_, value| value == '' } # valueが空のパラメータは削除
    commit = params[:commit]

    if commit == 'bulk_operation'
      bulk(params[:posts][:action], params[:posts][:selector])
    end

    if commit == 'bulk_operation' || commit == 'filter'
      redirect_to admin_post_path(:status => params[:status], :category_id => params[:category_id], :tag_id => params[:tag_id], :user_id => params[:user_id])
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
      posts = Post.all
    else
      if params[:tag_id].nil?
        posts = Post.where(search_string(valid_params))
      else
        # 存在しないtag_idだったらnilやで
        tag = Tag.find_by(:id => params[:tag_id])
        tag_related_posts = tag.nil? ? nil : tag.posts

        # 存在しないtag_idまたはtagに関連する記事がない場合だったらnilやで
        posts = tag_related_posts.nil? ? [] : tag_related_posts.where(search_string(valid_params))
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
    thumbnail_id = option_attribute[:thumbnail_image_id]
    tag_ids = params[:post][:tag] || []

    post_attribute[:published_at] = publish_datetime
    @post = Post.new(post_attribute)

    ActiveRecord::Base.transaction do
      if @post.save!
        option_attribute[:post_id] = @post.id

        PostOption.new(option_attribute).save!

        MediumRelation.create!({
          post_id: @post.id,
          medium_id: thumbnail_id,
          is_thumbnail: true
        })

        tag_ids.each do |tag_id|
          TagRelation.create!({
            post_id: @post.id,
            tag_id: tag_id
          })
        end
      end
    end
      redirect_to admin_post_edit_path(post_id: @post.id)
    rescue => e
      # エラー処理！！
  end

  def update
    @post = Post.find_by(:id => params[:post_id])

    return false if @post.nil?

    @media = MediumRelation.find_by(:post_id => @post.id, :is_thumbnail => true)
    post_attribute = post_params
    thumbnail_id = option_params[:thumbnail_image_id]
    tag_ids = params[:post][:tag] || []

    if post_attribute[:status] == 'future'
      post_attribute[:published_at] = Time.parse("#{post_date_params[:date]} #{post_date_params[:hour]}:#{post_date_params[:munite]}")
    elsif @post[:status] != 'publish' && post_attribute[:status] == 'publish'
      post_attribute[:published_at] = DateTime.now
    end

    ActiveRecord::Base.transaction do
      if @post.update!(post_attribute)
        @post.post_option.update!(option_params)
        @media.update!(:medium_id => thumbnail_id)

        @post.tags.each do |tag|
          TagRelation.find_by(:post_id => @post.id, :tag_id => tag.id).delete
        end

        tag_ids.each do |tag_id|
          TagRelation.create!({
            post_id: @post.id,
            tag_id: tag_id
          })
        end
      end
    end
      redirect_to admin_post_edit_path(post_id: @post.id)
    rescue => e
      # エラー処理！！
  end

  def destory
    @post = Post.find_by(:id => params[:post_id])

    unless @post.nil?
      @post.tags.each do |tag|
        TagRelation.find_by(:post_id => @post.id, :tag_id => tag.id).delete
      end
      @post.media.each do |medium|
        MediumRelation.find_by(:post_id => @post.id, :medium_id => medium.id).delete
      end

      @post.post_option.delete
      @post.delete
    end

    redirect_to admin_post_path
  end

  def bulk(action, post_ids)
    if post_ids.nil? && action == ''
      return false
    end

    post_ids.each do |id|
      post = Post.find_by(:id => id)

      next if post.nil?

      if action == 'delete'
        post.tags.each do |tag|
          TagRelation.find_by(:post_id => id, :tag_id => tag.id).delete
        end
        post.media.each do |medium|
          MediaRelation.find_by(:post_id => id, :medium_id => medium.id).delete
        end

        post.post_option.delete
        post.delete

        next
      end

      post.update(:status => action)
    end

    return true
  end

  def image_format(image)
    ImageProcessing::MiniMagick.source(image).resize_to_fit(480, 300).call
  end

  def post_params
    params.require(:post).permit(:user_id, :category_id, :postname, :title, :content, :status)
  end

  def post_date_params
    params.require(:post).permit(:date, :hour, :munite)
  end

  def option_params
    params.require(:post_option).permit(:post_id, :thumbnail_image_id, :description, :canonical, :noindex, :nofollow)
  end
end
