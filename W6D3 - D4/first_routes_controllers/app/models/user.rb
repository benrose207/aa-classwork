# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true

    has_many :artworks,
    primary_key: :id,
    foreign_key: :artist_id,
    class_name: :Artwork,
    dependent: :destroy

    has_many :artwork_shares,
        foreign_key: :viewer_id,
        class_name: :ArtworkShare,
        dependent: :destroy

    has_many :comments,
        foreign_key: :author_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :likes,
        foreign_key: :liker_id,
        class_name: :Like

    has_many :shared_artworks,
        through: :artwork_shares,
        source: :artwork
    
    def favorite_artwork(artwork_id)
        favorited = artworks.find_by('favorite = true')
        if favorited
            favorited.favorite = false
        end

        new_favorite = artworks.find_by('artwork_id = ?', artwork_id)
        new_favorite.favorite = true
    end

    def favorite_shared_artwork(artwork_id)
        favorited = shared_artworks.find_by('favorite = true')
        if favorited
            favorited.favorite = false
        end
        
        new_favorite = shared_artworks.find_by('artwork_id = ?', artwork_id)
        new_favorite.favorite = true
    end
end
