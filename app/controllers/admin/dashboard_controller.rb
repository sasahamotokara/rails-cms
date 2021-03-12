class Admin::DashboardController < ApplicationController
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
  end
end