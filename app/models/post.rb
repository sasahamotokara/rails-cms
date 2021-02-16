class Post < ApplicationRecord
  before_save :future_to_publish
  before_update :future_to_publish

  belongs_to :category
  belongs_to :user
  belongs_to :tag, optional: true
  belongs_to :medium, optional: true
  has_one :post_option
  has_many :tag_relations
  has_many :tags, through: :tag_relations
  has_many :media_relations
  has_many :media, through: :media_relations

  def self.search(keyword)
    keyword ? where('title like? OR content like?', "%#{keyword}%", "%#{keyword}%") : all
  end

  private

  def future_to_publish
    self.status = 'publish' if self.status == 'future'
  end
end
