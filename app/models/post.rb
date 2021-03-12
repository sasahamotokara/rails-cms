class Post < ApplicationRecord
  before_save :future_to_publish
  before_update :future_to_publish

  belongs_to :user
  belongs_to :category
  belongs_to :tag, optional: true
  belongs_to :medium, optional: true
  has_one :post_option
  has_one :thumbnail_relation
  has_one :thumbnail, through: :thumbnail_relation, source: :medium
  has_many :taxonomy_relations
  has_many :tags, through: :taxonomy_relations
  has_many :medium_relations
  has_many :media, through: :medium_relations

  validates :thumbnail_id, numericality: { only_integer: true }, allow_blank: true
  with_options presence: true do
    validates :user_id, numericality: { only_integer: true }
    validates :category_id
    validates :title
    validates :content
    validates :postname, uniqueness: true, format: { with: /\A[a-zA-Z0-9_-]+\z/ }
    validates :status, format: { with: /\A(publish|future|private|draft)\z/ }
  end

  def self.search(keyword)
    keyword ? where('title like? OR content like?', "%#{keyword}%", "%#{keyword}%") : all
  end

  private

  def future_to_publish
    self.status = 'publish' if self.status == 'future'
  end
end
