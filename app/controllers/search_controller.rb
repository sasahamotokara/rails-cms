class SearchController < ApplicationController
  before_action do
      @settings = load_setting
  end

  def index
    keyword = params[:keyword]
    @published_posts = Post.where('status = ? and published_at <= ?', 'publish', DateTime.now).order(:created_at => 'DESC')
    @post = keyword != '' ? @published_posts.search(keyword) : nil
  end
end
