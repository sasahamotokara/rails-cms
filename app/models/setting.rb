class Setting < ApplicationRecord
  validates :site_name, presence: true
  validates :site_catch, length: { maximum: 160 }
  validates :site_url, format: { with: /\Ahttp(s)?:\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-.\/?%&=]*)+\z/ }, allow_blank: true
end
