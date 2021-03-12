class PostOption < ApplicationRecord
  belongs_to :post, optional: true

  validates :post_id, numericality: { only_integer: true }
  validates :description, length: { maximum: 160 }
  validates :canonical, format: { with: /\Ahttp(s)?:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-.\/?%&=]*)+\z/ }, allow_blank: true
  validates :noindex, inclusion: { in: [true, false] }
  validates :nofollow, inclusion: { in: [true, false] }
end
