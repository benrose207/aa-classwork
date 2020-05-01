require "hand"

describe Hand do
    let(:deck){double("deck", :draw => :Card)}
    subject(:hand) {Hand.new(deck)}
    describe "#initialize" do

        it "should accept a deck as an argument" do 
            expect{Hand.new(deck)}.to_not raise_error
        end

        it "should create a hand with five cards" do 
            expect(hand.cards.length).to eq(5)
        end

    end

end