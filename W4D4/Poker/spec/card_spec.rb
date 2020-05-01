require "card.rb"

describe Card do

    describe "#initialize" do
        it "should accept a suit and a value" do
            expect { Card.new(:club, 13) }.to_not raise_error
        end

        it "should set instance variable for suit and value" do
            card = Card.new(:club, 13)
            expect(card.suit).to be(:club)
            expect(card.value).to eq(13)

        end
    end

end