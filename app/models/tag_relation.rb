class TagRelation < ApplicationRecord
  belongs_to :tag, optional: true
  belongs_to :post, optional: true

  validates :post_id, numericality: { only_integer: true }
  validates :tag_id, numericality: { only_integer: true }
end
