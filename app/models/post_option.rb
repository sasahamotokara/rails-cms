class PostOption < ApplicationRecord
  belongs_to :post, optional: true
end
