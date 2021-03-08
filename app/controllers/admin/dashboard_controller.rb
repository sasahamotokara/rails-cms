class Admin::DashboardController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
  end
end