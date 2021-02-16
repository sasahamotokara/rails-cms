class Slug < ApplicationRecord
  belongs_to :category, optional: true
  belongs_to :tag, optional: true
end
