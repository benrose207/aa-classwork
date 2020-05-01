class Deck 
    attr_reader :cards

    def initialize
        @cards = []
        self.place_cards
        self.shuffle 
    end

    def place_cards
        suits = [:hearts,:diamonds,:spades,:clubs]
        suits.each do |suit|
            (2..14).each do |value|
                cards << Card.new(suit, value)
            end
        end
    end

    def suit_count
        counter = Hash.new(0)
        @cards.each { |card| counter[card.suit] += 1 }
        counter
    end

    def value_count
        counter = Hash.new(0)
        @cards.each { |card| counter[card.value] += 1 }
        counter
    end

    def shuffle
        @cards.shuffle!
    end

    def draw
        @cards.pop
    end

end

