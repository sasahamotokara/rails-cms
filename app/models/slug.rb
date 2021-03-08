class Slug < ApplicationRecord
  belongs_to :category, optional: true
  belongs_to :tag, optional: true

  validates :slug, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_-]+\z/ }
  validates :category_id_or_tag_id, presence: true

  private
    def category_id_or_tag_id
      category_id.presence or tag_id.presence
    end
end
