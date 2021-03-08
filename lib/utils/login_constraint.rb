class LoginConstraint
  def initialize
  end

  def self.matches?(request)
    !request.session[:user_id].present?
  end
end
