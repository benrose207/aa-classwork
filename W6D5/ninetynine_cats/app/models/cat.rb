class Cat < ApplicationRecord
    include ActionView::Helpers::DateHelper

    COLORS = ['black', 'brown', 'white', 'orange']

    validates :color, inclusion: { in: COLORS}, presence: true
    
    validates :sex, inclusion: { in: %w(M F)}, presence: true

    validates :birth_date, :name, :description, presence: true

    def age
        time_ago_in_words(self.birth_date)
    end

end
