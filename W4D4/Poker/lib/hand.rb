class Hand
    attr_reader :cards 

    def initialize(deck)
        
        @deck = deck 
        @cards = []
        5.times {@cards << @deck.draw}

    end

    
end