# == Schema Information
#
# Table name: shortened_urls
#
#  id         :bigint           not null, primary key
#  long_url   :string           not null
#  short_url  :string
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'securerandom'

class ShortenedUrl < ApplicationRecord

    validates :long_url, :user_id, presence: true
    validates :short_url, uniqueness: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    def self.random_code
        unique = false
        until unique
            code = SecureRandom.urlsafe_base64(16)
            unique = true unless self.exists?(['short_url LIKE ?', "%#{code}%"])
        end
        code
    end 

    def self.create!(user, long_url)
        shorturl = 'https://shorturl.com/' + ShortenedUrl.random_code
        new_url = ShortenedUrl.new(short_url: shorturl, user_id: user.id, long_url: long_url)
        new_url.save!
    end 
end 
