class Form::CategoryCollection < Form::Base
  FORM_COUNT = 10
  attr_accessor :categories

  def initialize(attributes = {})
    super attributes

    unless self.categories.present?
      self.categories = FORM_COUNT.times.map {Category.new()}
    end
  end

  def categories_attributes=(attributes)
    self.categories = attributes.map {|_, value| Category.new(value)}
  end

  def save
    Category.transaction do
        self.categories.map(&:save!)
    end
      return true
    rescue =>
      return false
  end
end
