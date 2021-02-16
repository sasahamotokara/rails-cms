class Medium < ApplicationRecord
  belongs_to :post, optional: true
  has_many :medium_relations
  has_many :posts, through: :medium_relations
end
