module ApplicationHelper
  include CreatePaginationHelper

  def load_setting
    Setting.find_by({ id: 1 }) || Setting.new
  end

  def admin?
    request.path.split('/')[1] == 'admin'
  end

  def login?
    request.path.split('/')[1] == 'admin' && request.path.split('/')[2] == 'login'
  end
end
