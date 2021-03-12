class Form::CategoryCollection < Form::Base
  FORM_COUNT = 10
  attr_accessor :categories, :slugs

  def initialize(attributes = {})
    super attributes

    self.categories = FORM_COUNT.times.map {Category.new()} unless self.categories.present?
    self.slugs = FORM_COUNT.times.map {Term.new()} unless self.slugs.present?
  end

  def categories_attributes=(attributes)
    self.categories = attributes.map {|_, value| Category.new(:name => value[:name])}
    self.slugs = attributes.map {|_, value| Term.new(:slug => value[:slug])}
  end

  def save
    ActiveRecord::Base.transaction do
      self.slugs.map.with_index do |slug, index|
        if slug.save!
          category = self.categories[index]
          category[:term_id] = slug.id

          if category.save!
            slug.update!(:category_id => category.id)
          end
        end
      end
    end
      return true
    rescue => e
      return false
  end
end
