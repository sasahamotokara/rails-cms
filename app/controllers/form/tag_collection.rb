class Form::TagCollection < Form::Base
  FORM_COUNT = 10
  attr_accessor :tags, :slugs

  def initialize(attributes = {})
    super attributes

    self.tags = FORM_COUNT.times.map {Tag.new()} unless self.tags.present?
    self.slugs = FORM_COUNT.times.map {Term.new()} unless self.slugs.present?
  end

  def tags_attributes=(attributes)
    self.tags = attributes.map {|_, value| Tag.new(:name => value[:name])}
    self.slugs = attributes.map {|_, value| Term.new(:slug => value[:slug])}
  end

  def save
    ActiveRecord::Base.transaction do
      self.slugs.map.with_index do |slug, index|
        if slug.save!
          tag = self.tags[index]
          tag[:term_id] = slug.id

          if tag.save!
            slug.update!(:tag_id => tag.id)
          end
        end
      end
    end
      return true
    rescue => e
      return false
  end
end
