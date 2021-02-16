class Admin::DashboardController < ApplicationController
  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
  end
end