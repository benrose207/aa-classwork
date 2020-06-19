# == Schema Information
#
# Table name: benches
#
#  id          :bigint           not null, primary key
#  description :string           not null
#  lat         :float            not null
#  lng         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  seating     :integer
#
class Bench < ApplicationRecord

    validates :description, :lat, :lng, presence: true
    
    def self.in_bounds(bounds) 
        northeast = bounds["northEast"]
        southwest = bounds["southWest"]

        bounded = Bench
            .where("lat < ? AND lat > ?", northeast["lat"], southwest["lat"])
            .where("lng < ? AND lng > ?", northeast["lng"], southwest["lng"])

        bounded
    end
end
