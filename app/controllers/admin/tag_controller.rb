class Admin::TagController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:tag][:action], params[:tag][:selector])
      return
    end

    @tag = Tag.new
    @slug = Slug.new
    get_per_page
  end

  def get_per_page
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @tags = Tag.all.limit(@per_page).offset(offset).order(:name)
    @tag_count = @tags.length
  end

  def edit
    @tag = Tag.find_by(:id => params[:tag_id])
  end

  def create
    @tag = Tag.new(tag_params)

    ActiveRecord::Base.transaction do
      if @tag.save
        @slug = Slug.new(:slug => params[:tag][:slug], :tag_id => @tag.id)

        unless @slug.save
          @tag.errors.merge!(@slug.errors)
          raise ActiveRecord::RecordInvalid.new(Slug.new)
        end

        @tag.update!(:slug_id => @slug.id)
      else
        @slug = Slug.new(:slug => params[:tag][:slug])
        @tag.errors.merge!(@slug.errors) if @slug.invalid?
        raise ActiveRecord::RecordInvalid.new(Tag.new)
      end
    end
      redirect_to admin_tag_path, notice: 'カテゴリーを追加しました'
    rescue
      get_per_page
      flash.now[:alert] = 'カテゴリーを追加できませんでした'
      render :index
  end

  def update
    @tag = Tag.find_by(:id => params[:tag_id])

    redirect_to admin_tag_path, alert: '予期せぬエラーが発生しました' and return if @tag.nil?

    ActiveRecord::Base.transaction do
      if @tag.update(tag_params)
        @slug = @tag.slug

        unless @slug.update(:slug => params[:tag][:slug])
          @tag.errors.merge!(@slug.errors)
          raise ActiveRecord::RecordInvalid.new(Slug.new)
        end
      else
        @slug = @tag.slug
        @tag.errors.merge!(@slug.errors) if !@slug.update(:slug => params[:tag][:slug])
        raise ActiveRecord::RecordInvalid.new(Tag.new)
      end
    end
      redirect_to admin_tag_edit_path(:tag_id => params[:tag_id]), notice: '更新しました'
    rescue => e
      flash.now[:alert] = '更新に失敗しました'
      render :edit
  end

  def destory
    @tag = Tag.find_by(:id => params[:tag_id])

    unless @tag.nil?
      @tag.delete
      @tag.slug.delete

      @tag.posts.each do |post|
        TagRelation.find_by(:post_id => post.id, :tag_id => @tag.id).delete
      end
    end

    redirect_to admin_tag_path, notice: '削除しました'
  end

  def bulk(action, tag_ids)
    if tag_ids.nil?
      redirect_to admin_tag_path, alert: '対象のタグを選択してください。' and return
    end

    if action == 'delete'
      tag_ids.each do |id|
        tag = Tag.find_by(:id => id)

        tag.delete
        tag.slug.delete
        tag.posts.each do |post|
          TagRelation.find_by(:post_id => post.id, :tag_id => tag.id).delete
        end
      end
      redirect_to admin_tag_path, notice: '一括削除を実行しました。' and return
    end

    redirect_to admin_tag_path, alert: '一括操作を選択して実行してください。'
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
