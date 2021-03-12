class Category < ApplicationRecord
  has_one :term
  has_many :taxonomy_relations
  has_many :posts, through: :taxonomy_relations

  validates :name, presence: true, length: { maximum: 30 }
  validates :term_id, numericality: { only_integer: true }, allow_blank: true
  validates :color, presence: true, format: { with: /\A#([\da-fA-F]{6}|[\da-fA-F]{3})\z/ }
end
