class MediumRelation < ApplicationRecord
  belongs_to :medium, optional: true
  belongs_to :post, optional: true
end
