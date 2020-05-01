require "deck"

describe Deck do 
    subject(:deck){Deck.new}
    describe "#initialize" do 
        it "Creates a deck with 52 cards" do 
            expect(deck.cards.length).to eq(52)
        end

        it "should have 13 cards of each suit" do 
            expect(deck.suit_count.values.all?(13)).to be true
        end

        it "should have the right number of each value" do 
            expect(deck.value_count.values.all?(4)).to be true 
        end
    end

    describe "#shuffle" do
        it "should shuffle the deck" do
            old_cards = deck.cards.dup
            deck.shuffle
            expect(deck.cards).to_not eq(old_cards)
        end
    end
end