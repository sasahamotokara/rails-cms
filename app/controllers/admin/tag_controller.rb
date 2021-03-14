class Admin::TagController < ApplicationController
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    bulk(tag_bulk_params[:action], tag_bulk_params[:selector]) and return if params[:commit] == 'bulk_operation'

    @tag = Tag.new
    @term = Term.new
    per_page
  end

  def per_page
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    @tags = Tag.eager_load(:term).preload(:posts).all.limit(@per_page).offset(@current_page <= 1 ? 0 : @per_page * (@current_page - 1)).order(:name)
    @tag_count = @tags.length
  end

  def edit
    @tag = Tag.find_by({ id: params[:tag_id] })
    redirect_to admin_tag_path, alert: '編集対象のカテゴリーが見つかりませんでした' and return if @tag.nil?
  end

  def create
    @tag = Tag.new(tag_params)
    slug = params[:tag][:slug]

    ActiveRecord::Base.transaction do
      if @tag.save
        @term = Term.new({ slug: slug, tag_id: @tag.id })

        unless @term.save
          @tag.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(@term.errors.full_messages, Term.new)
        end

        @tag.update!(:term_id => @term.id)
      else
        @term = Term.new({ slug: slug })
        @tag.errors.merge!(@term.errors) if @term.invalid?
        raise ActiveRecord::RecordInvalid.new(@tag.errors.full_messages, Tag.new)
      end
    end
    redirect_to admin_tag_path, notice: 'カテゴリーを追加しました'
    rescue
      per_page
      flash.now[:alert] = 'カテゴリーを追加できませんでした'
      render :index
  end

  def update
    @tag = Tag.find_by({ id: params[:tag_id] })
    slug = params[:tag][:slug]

    redirect_to admin_tag_path, alert: '予期せぬエラーが発生しました' and return if @tag.nil?

    ActiveRecord::Base.transaction do
      @term = @tag.term

      if @tag.update(tag_params)
        unless @term.update({ slug: slug })
          @tag.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(@term.errors.full_messages, Term.new)
        end
      else
        @term = @tag.term
        @tag.errors.merge!(@term.errors) unless @term.update({ slug: slug })
        raise ActiveRecord::RecordInvalid.new(@tag.errors.full_messages, Tag.new)
      end
    end
    redirect_to admin_tag_edit_path(:tag_id => params[:tag_id]), notice: '更新しました'
    rescue
      flash.now[:alert] = '更新に失敗しました'
      render :edit
  end

  def destory
    tag = Tag.find_by({ id: params[:tag_id] })

    redirect_to admin_tag_path, alert: '予期せぬエラーが発生しました' and return if tag.nil?

    tag.delete
    tag.term.delete
    tag.posts.each do |post|
      TaxonomyRelation.find_by({ post_id: post.id, tag_id: @tag.id }).delete
    end

    redirect_to admin_tag_path, notice: '削除しました'
  end

  def bulk(action, tag_ids)
    redirect_to admin_tag_path, alert: '対象のタグを選択してください。' and return if tag_ids.nil?

    if action == 'delete'
      tag_ids.each do |id|
        tag = Tag.find_by({ id: id })

        tag.delete
        tag.term.delete
        tag.posts.each do |post|
          TaxonomyRelation.find_by({ post_id: post.id, tag_id: tag.id }).delete
        end
      end

      redirect_to admin_tag_path, notice: '一括削除を実行しました。' and return
    end

    redirect_to admin_tag_path, alert: '一括操作を選択して実行してください。'
  end

  def tag_params
    params.require(:tag).permit(:name)
  end

  def tag_bulk_params
    params.require(:tag).permit(:action, :selector)
  end
end
