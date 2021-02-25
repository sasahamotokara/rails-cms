class Admin::SettingController < ApplicationController
  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
    @setting = Setting.find_by(:id => 1) || Setting.new
  end

  def update
    @setting = Setting.find_by(:id => 1)

    if @setting.nil?
      @setting = Setting.new(setting_params)
      @setting.save
    else
      @setting.update(setting_params)
    end

    redirect_to admin_setting_path
  end

  def setting_params
    params.require(:setting).permit(:site_name, :site_catch, :site_url)
  end
end
