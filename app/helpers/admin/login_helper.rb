module Admin::LoginHelper
  # do login argments user
  def log_in(user)
    session[:user_id] = user.id
  end

  # returns logined user-info
  def current_user
    if session[:user_id]
      @current_user ||= User.find_by(:id => session[:user_id])
    end
  end

  # return boolean user == logined user?
  def current_user?(user)
    user == current_user
  end

  # returns user == current_user?
  def logged_in?
    !current_user.nil?
  end

  # do logout
  def log_out
    session.delete(:user_id)
    @current_user = nil
  end
end
