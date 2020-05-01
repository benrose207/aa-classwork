class Card
    attr_reader :suit, :value

    def initialize(suit, value)
        @suit = suit
        @value = value
    end

    def identity
        display_value = self.value
        case self.value
        when 11
            display_value = "J"
        when 12
            display_value = "Q"
        when 13
            display_value = "K"
        when 14
            display_value = "A"
        end
        [self.suit, display_value]
    end

end