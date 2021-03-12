class Tag < ApplicationRecord
  has_one :term
  has_many :taxonomy_relations
  has_many :posts, through: :taxonomy_relations

  validates :name, presence: true, length: { in: 2..30 }
  validates :term_id, numericality: { only_integer: true }, allow_blank: true
end
