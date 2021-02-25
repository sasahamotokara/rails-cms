class BlogController < ApplicationController
  before_action do
    @published_posts = Post.where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:published_at => 'DESC')
    @settings = load_setting
  end

  def term
    @slug = Slug.find_by(:slug => params[:slug])

    if @slug.nil? || (@slug.category_id.nil? && @slug.tag_id.nil?)
      @is_404 = true
      render template: 'errors/not_found', status: 404
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @slug_type = @slug.category_id.nil? ? 'tag' : 'category'
    @term = @slug.category || @slug.tag
    @posts = @term.posts.where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:published_at => 'DESC')
    @post_count = @posts.length
    @posts = @post_count.zero? ? [] : @posts.limit(@per_page).offset(offset)
  end

  def post
    @slug = Slug.find_by(:slug => params[:category])
    @category = @slug.nil? || @slug.category_id.nil? ? nil : Category.find_by(:id => @slug.category_id)
    @post = @category.nil? ? nil : @published_posts.find_by(:category_id => @slug.category_id, :postname => params[:postname])
    @is_404 = @post.nil?

    render template: 'errors/not_found', status: 404 if @is_404
  end
end
