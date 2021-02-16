class FrontPageController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
    @published_posts = Post.order(:created_at => 'DESC').where('status = ? and published_at <= ?', 'publish', DateTime.now)
  end
end
