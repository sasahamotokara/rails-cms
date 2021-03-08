class MediumRelation < ApplicationRecord
  belongs_to :medium, optional: true
  belongs_to :post, optional: true

  validates :post_id, numericality: { only_integer: true }
  validates :medium_id, numericality: { only_integer: true }, allow_blank: true
  validates :is_thumbnail, inclusion: { in: [true, false] }
end
