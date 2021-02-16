class Admin::TagController < ApplicationController
  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:tag][:action], params[:tag][:selector])
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @tag = Tag.all.limit(@per_page).offset(offset).order(:created_at => 'DESC')
    @tag_count = @tag.length
  end

  def edit
    @tag = Tag.find_by(:id => params[:tag_id])
  end

  def create
    @tag = Tag.new(tag_params)

    ActiveRecord::Base.transaction do
      if @tag.save!
        @slug = Slug.new(:slug => params[:tag][:slug], :tag_id => @tag.id)
        @slug.save!

        @tag.update!(:slug_id => @slug.id)
      end
    end
      redirect_to admin_tag_path
    rescue => e
      # エラー処理！！
  end

  def update
    @tag = Tag.find_by(:id => params[:tag_id])

    if @tag.nil?
      redirect_to admin_tag_path
      return
    end

    ActiveRecord::Base.transaction do
      if @tag.update!(tag_params)
        @tag.slug.update!(:slug => params[:tag][:slug], :tag_id => @tag.id)
      end
    end
      redirect_to admin_category_path
    rescue => e
      # エラー処理！！
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

    redirect_to admin_tag_path
  end

  def bulk(action, tag_ids)
    if action == 'delete'
      tag_ids.each do |id|
        tag = Tag.find_by(:id => id)

        tag.delete
        tag.slug.delete
        tag.posts.each do |post|
          TagRelation.find_by(:post_id => post.id, :tag_id => tag.id).delete
        end
      end
    end

    redirect_to admin_tag_path
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
