require "Towers.rb"

describe Towers do 
    subject(:game) { Towers.new(5) }

    describe "#initialize" do 
        it "should accept a number as an argument" do
            expect { Towers.new(5) }.to_not raise_error
        end

        it "should initialize three stacks as arrays" do
            expect(game.stack_1).to be_an(Array)
            expect(game.stack_2).to be_an(Array)
            expect(game.stack_3).to be_an(Array)
        end

        it "should initialize the first stack to contain the right number of disks" do
            expect(game.stack_1.length).to eq(5)
            expect(game.stack_1[0]).to be < game.stack_1[1]
        end
    end

    describe "#valid_move?" do 

        it "should return false if input is not an array of integers" do 
            expect(game.valid_move?(['1','2'])).to be false 
            expect(game.valid_move?([1,2,3])).to be false 
        end

        it "should return false if the move is invalid" do
            game.stack_2.unshift(game.stack_1.shift)
            expect(game.valid_move?([1,2])).to be false 
        end

        it "should return true if the move is valid" do
            game.stack_2.unshift(game.stack_1.shift)
            expect(game.valid_move?([2,1])).to be true
            expect(game.valid_move?([1,3])).to be true 
        end


    end

    describe "#move" do
        it "should take in an array of two numbers as an argument" do
            expect { game.move([1,2]) }.to_not raise_error
        end

        it "should move the top disc from the start stack to the end stack" do
            top_disc = game.stack_1[0] 
            game.move([1,2]) 
            expect(game.stack_2[0]).to eq(top_disc)
            expect(game.stack_1[0]).to eq(2)
        end

    end

    describe "#won?" do
        context "game is over" do
            it "should return true" do
                game.stack_2.concat(game.stack_1.shift(5))
                expect(game.won?).to be true
            end
        end

        context "game is not over" do
            it "should return false" do 
                expect(game.won?).to be false
            end
        end
    end

end