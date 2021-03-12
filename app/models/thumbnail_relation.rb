class ThumbnailRelation < ApplicationRecord
  belongs_to :post, optional: true
  belongs_to :medium, optional: true

  validates :medium_id, numericality: { only_integer: true }, allow_blank: true
  with_options presence: true do
    validates :post_id, numericality: { only_integer: true }
  end
end
