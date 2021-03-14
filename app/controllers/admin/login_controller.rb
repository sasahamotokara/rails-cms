class Admin::LoginController < ApplicationController
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    @user = User.new
  end

  def create
    user = User.find_by({ email: login_params[:email].downcase })

    if !user.nil? && user.authenticate(login_params[:password])
      log_in(user)
      redirect_to admin_root_url, notice: 'ログインしました'
    else
      flash.now[:error] = 'ログインに失敗しました'
      render :index
    end
  end

  def destory
    log_out if logged_in?
    redirect_to admin_root_url
  end

  def login_params
    params.require(:login).permit(:email, :password)
  end
end
