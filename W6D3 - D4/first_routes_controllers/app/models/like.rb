class Like < ApplicationRecord
    validates :liker_id, presence: true, uniqueness: {scope: [:likeable_type, :likeable_id]}

    belongs_to :likeable, 
        polymorphic: true

    belongs_to :user,
        class_name: :User,
        foreign_key: :liker_id
end
