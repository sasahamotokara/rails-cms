class Category < ApplicationRecord
  has_one :slug
  has_many :posts
end
