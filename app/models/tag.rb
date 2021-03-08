class Tag < ApplicationRecord
  has_one :slug
  has_many :tag_relations
  has_many :posts, through: :tag_relations

  validates :name, presence: true, length: { in: 2..30 }
  validates :slug_id, numericality: { only_integer: true }, allow_blank: true
end
