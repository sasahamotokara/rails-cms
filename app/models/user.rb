class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :medium

  with_options presence: true do
    validates :name, uniqueness: true, length: { maximum: 15 }, format: { with: /\A[a-zA-Z0-9_-]+\z/ }
    validates :email, uniqueness: true, format: { with: /\A[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/ }
    validates :display_name, length: { maximum: 50 }
    validates :password, format: { with: /\A([a-zA-Z0-9.!:;@?<>#$%&'*+\/\\=?^_`{|}\[\]~-])+\z/}
  end
end
