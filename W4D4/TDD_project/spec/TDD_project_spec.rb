require "TDD_project.rb"

describe "#my_uniq" do
    it "should accept an array as an argument" do
        expect { my_uniq([1,2,3,4,5]) }.to_not raise_error
    end

    it "should return an array" do
        expect(my_uniq([1,2,3,4,5])).to be_a(Array)
    end

    it "should return the uniq elements in order" do
        expect(my_uniq([1, 2, 1, 3, 3])).to eq([1, 2, 3])
    end
end

describe Array do
    describe "#two_sum" do 
        it "should accept an array as an argument" do
            expect { [1,2,3,4,5].two_sum }.to_not raise_error
        end

        it "should return an array" do
            expect([1,2,3,4,5].two_sum).to be_a(Array)
        end

        it "should find all pairs of positions that sum to zero" do
            expect([-1, 0, 2, -2, 1].two_sum).to eq([[0, 4], [2, 3]])
        end
    end
end

describe "#my_transpose" do 
    describe "accepts valid arguments" do
     it "should accept a 2d array as an argument" do
        expect { my_transpose([[1,1,1],[2,2,2],[3,3,3]]) }.to_not raise_error
     end

     it "should only accept symmetrical matrices" do
        expect{my_transpose([[1],[2,3]])}.to raise_error("please enter a symmetrical array")
     end
    end

    describe "when called on an array" do
        it "should transpose the original array" do
            expect(my_transpose([[0, 1, 2],[3, 4, 5],[6, 7, 8]])).to eq([[0, 3, 6],[1, 4, 7],[2, 5, 8]])
        end
    end
end

describe "#stock_picker" do
    it "takes in an array of numbers as an argument" do
        expect{stock_picker([1,2,3,4,5])}.to_not raise_error
    end

    it "returns the most profitable pair of days to buy and sell stock" do
        expect(stock_picker([4,1,3,6,2])).to eq([1,3])
    end

    it "you can't sell stock before you buy" do
        result = stock_picker([6,4,3,2,1])
        expect(result[0]).to be < result[1]
    end

    it "input array should contain at least 2 days worth of stock prices" do
        expect  {stock_picker([2])}.to raise_error("should have at least 2 days of data!")
    end
end