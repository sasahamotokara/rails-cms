class TridentBrowserConstraint
  def initialize
  end

  def self.matches?(request)
    user_agent = request.user_agent.downcase
    user_agent.include?('msie') || user_agent.include?('trident')
  end
end
