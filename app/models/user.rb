class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :medium
end
