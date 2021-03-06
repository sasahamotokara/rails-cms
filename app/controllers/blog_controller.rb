class BlogController < ApplicationController
  before_action do
    @published_posts = Post.eager_load(:thumbnail, :category, :post_option).preload(:tags).where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:published_at => 'DESC')
    @settings = load_setting
  end

  def term
    @term = Term.find_by(:slug => params[:slug])
    @term_type = @term.category_id.nil? ? 'tag' : 'category'
    @term = @term.tag || @term.category
    @posts = @term.nil? ? [] : @term.posts.eager_load(:thumbnail, :category, :post_option).preload(:tags).where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:published_at => 'DESC')
    @post_count = @posts.length

    if @term.nil? || @post_count.zero?
      @is_404 = true
      render template: 'errors/not_found', status: 404
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)
    @posts = @posts.limit(@per_page).offset(offset)
  end

  def post
    @term = Term.find_by(:slug => params[:category])
    @category = @term.nil? || @term.category_id.nil? ? nil : Category.find_by(:id => @term.category_id)
    @post = @category.nil? ? nil : @published_posts.find_by(:postname => params[:postname])
    @related_post = @category.nil? ? [] : @published_posts.where(:category_id => @term.category_id).where.not(:postname => params[:postname]).limit(6)
    @is_404 = @post.nil?

    render template: 'errors/not_found', status: 404 if @is_404
  end
end
