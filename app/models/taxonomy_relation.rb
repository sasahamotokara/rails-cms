class TaxonomyRelation < ApplicationRecord
  belongs_to :post, optional: true
  belongs_to :category, optional: true
  belongs_to :tag, optional: true

  validates :post_id, numericality: { only_integer: true }
  validates :category_id_or_tag_id, presence: true

  private

  def category_id_or_tag_id
    category_id.presence or tag_id.presence
  end
end
