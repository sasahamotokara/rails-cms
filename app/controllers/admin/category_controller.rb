class Admin::CategoryController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:category][:action], params[:category][:selector])
      return
    end

    @category = Category.new
    @term = Term.new
    get_per_page
  end

  def get_per_page
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @categories = Category.eager_load(:term).preload(:posts).all.limit(@per_page).offset(offset).order(:name)
    @category_count = @categories.length
  end

  def edit
    @category = Category.find_by(:id => params[:category_id]) || Category.new
  end

  def create
    @category = Category.new(category_params)

    ActiveRecord::Base.transaction do
      if @category.save
        @term = Term.new(:slug => params[:category][:slug], :category_id => @category.id)

        unless @term.save
          @category.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(Term.new)
        end

        @category.update!(:term_id => @term.id)
      else
        @term = Term.new(:slug => params[:category][:slug])
        @category.errors.merge!(@term.errors) if @term.invalid?
        raise ActiveRecord::RecordInvalid.new(Category.new)
      end
    end
      redirect_to admin_category_path, notice: 'カテゴリーを追加しました'
    rescue
      get_per_page
      flash.now[:alert] = 'カテゴリーを追加できませんでした'
      render :index
  end

  def update
    @category = Category.find_by(:id => params[:category_id])

    redirect_to admin_category_path, alert: '予期せぬエラーが発生しました' and return if @category.nil?

    ActiveRecord::Base.transaction do
      if @category.update(category_params)
        @term = @category.term

        unless @term.update(:slug => params[:category][:slug])
          @category.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(Term.new)
        end
      else
        @term = @category.term
        @category.errors.merge!(@term.errors) if !@term.update(:slug => params[:category][:slug])
        raise ActiveRecord::RecordInvalid.new(Category.new)
      end
    end
      redirect_to admin_category_edit_path(:category_id => params[:category_id]), notice: '更新しました'
    rescue => e
      flash.now[:alert] = '更新に失敗しました'
      render :edit
  end

  def destory
    category = Category.find_by(:id => params[:category_id])

    unless @category.nil?
      category.delete
      category.term.delete

      category.posts.each do |post|
        TaxonomyRelation.find_by(:post_id => post.id, :category_id => category.id).delete
      end
    end

    redirect_to admin_category_path, notice: '削除しました'
  end

  def bulk(action, category_ids)
    if category_ids.nil?
      redirect_to admin_category_path, alert: '対象のカテゴリーを選択してください。' and return
    end

    if action == 'delete'
      category_ids.each do |id|
        category = Category.find_by(:id => id)

        next if category.nil?

        category.delete
        category.term.delete
        category.posts.each do |post|
          TaxonomyRelation.find_by(:post_id => post.id, :category_id => category.id).delete
        end
      end

      redirect_to admin_category_path, notice: '一括削除を実行しました。' and return
    end

    redirect_to admin_category_path, alert: '一括操作を選択して実行してください。'
  end

  def category_params
    params.require(:category).permit(:name, :color)
  end
end
