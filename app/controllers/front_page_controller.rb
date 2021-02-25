class FrontPageController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
    @published_posts = Post.order(:published_at => 'DESC').where('status = ? and published_at <= ?', 'publish', DateTime.now)
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)
    @post_count = @published_posts.length
    @posts = @post_count.zero? ? [] : @published_posts.limit(@per_page).offset(offset)
  end
end
