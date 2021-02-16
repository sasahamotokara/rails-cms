class Admin::CategoryController < ApplicationController
  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:category][:action], params[:category][:selector])
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @category = Category.all.limit(@per_page).offset(offset).order(:created_at => 'DESC')
    @category_count = @category.length
  end

  def edit
    @category = Category.find_by(:id => params[:category_id])
  end

  def create
    @category = Category.new(category_params)

    ActiveRecord::Base.transaction do
      if @category.save!
        @slug = Slug.new(:slug => params[:category][:slug], :category_id => @category.id)
        @slug.save!

        @category.update!(:slug_id => @slug.id)
      end
    end
      redirect_to admin_category_path
    rescue => e
      # エラー処理！！
  end

  def update
    @category = Category.find_by(:id => params[:category_id])

    if @category.nil?
      redirect_to admin_category_path
      return
    end

    ActiveRecord::Base.transaction do
      if @category.update!(category_params)
        @category.slug.update!(:slug => params[:category][:slug], :category_id => @category.id)
      end
    end
      redirect_to admin_category_path
    rescue => e
      # エラー処理！！
  end

  def destory
    @category = Category.find_by(:id => params[:category_id])

    unless @category.nil?
      @category.delete
      @category.slug.delete

      @category.posts.each do |post|
        post.update(:category_id => 1)
      end
    end

    redirect_to admin_category_path
  end

  def bulk(action, category_ids)
    if category_ids.nil?
      # エラー出す
      redirect_to admin_category_path
      return
    end

    if action == 'delete'
      category_ids.each do |id|
        category = Category.find_by(:id => id)

        next if category.nil?

        category.delete
        category.slug.delete
        category.posts.each do |post|
          post.update(:category_id => 1)
        end
      end
    end

    redirect_to admin_category_path
  end

  def category_params
    params.require(:category).permit(:name, :color)
  end
end
