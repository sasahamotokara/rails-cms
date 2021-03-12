class ApplicationController < ActionController::Base
  include ApplicationHelper
  include Admin::LoginHelper

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |name, password|
      name == ENV['BASIC_AUTH_NAME'] && password == ENV['BASIC_AUTH_PASSWORD']
    end
  end
end
