class Admin::LoginController < ApplicationController
  before_action do
    @settings = load_setting
  end

  def index
    @user = User.new
  end

  def create
    user = User.find_by(:email => params[:login][:email].downcase)

    if user && user.authenticate(params[:login][:password])
      log_in(user)
      redirect_to admin_root_url, notice: 'ログインしました'
    else
      render :index
    end
  end

  def destory
    if logged_in?
      log_out
    end

    redirect_to admin_root_url
  end
end
