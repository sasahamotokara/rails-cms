class SearchController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
    keyword = params[:keyword]
    @published_posts = Post.eager_load(:thumbnail, :category, :post_option).preload(:tags).where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:published_at => 'DESC')
    @result_posts = keyword.blank? ? [] : @published_posts.search(keyword)
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    @post_count = @result_posts.length
    @posts = @post_count.zero? ? [] : @result_posts.limit(@per_page).offset(@current_page <= 1 ? 0 : @per_page * (@current_page - 1))
  end
end
