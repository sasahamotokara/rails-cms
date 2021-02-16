class BlogController < ApplicationController
  before_action do
    @published_posts = Post.where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:created_at => 'DESC')
    @settings = load_setting
  end

  def term
    @slug = Slug.find_by(:slug => params[:slug])

    if @slug.nil? || (@slug.category_id.nil? && @slug.tag_id.nil?)
      @is_404 = true
      render template: 'errors/not_found', status: 404
      return
    end

    @slug_type = @slug.category_id.nil? ? 'tag' : 'category'
    @term = @slug.category || @slug.tag
    @posts = @term.posts.where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:created_at => 'DESC')
  end

  def post
    @slug = Slug.find_by(:slug => params[:category])
    @category = @slug.nil? || @slug.category_id.nil? ? nil : Category.find_by(:id => @slug.category_id)
    @post = @category.nil? ? nil : @published_posts.find_by(:category_id => @slug.category_id, :postname => params[:postname])
    @is_404 = @post.nil?

    render template: 'errors/not_found', status: 404 if @is_404
  end
end
