class Medium < ApplicationRecord
  belongs_to :post, optional: true
  has_one :thumbnail_relation
  has_many :medium_relations
  has_many :posts, through: :medium_relations

  with_options presence: true do
    validates :user_id, numericality: { only_integer: true }
    validates :url
    validates :name, uniqueness: true
    validates :extension, format: { with: /\A(jpg|jpeg|png|gif)\z/ }
  end
end
