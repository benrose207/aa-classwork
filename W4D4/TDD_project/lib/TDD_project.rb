def my_uniq(array)
    counter = Hash.new(0)
    array.each { |ele| counter[ele] += 1 }

    counter.keys
end

class Array 
    def two_sum
      pairs = []
      self.each_with_index do |ele1,idx1| 
        self.each_with_index do |ele2,idx2|
        
           pairs << [idx1,idx2] if idx2 > idx1 && ele1 + ele2 == 0

        end
      end
      pairs 
    end
end

def my_transpose(array)
    raise "please enter a symmetrical array" if array.any?{|sub| sub.length != array.length}

    rotated = Array.new(array.length) { Array.new(array.length) }

    array.each_with_index do |sub, x|
        sub.each_with_index do |ele, y|
            rotated[y][x] = ele
        end
    end

    rotated
end

def stock_picker(stocks)
    raise "should have at least 2 days of data!" if stocks.length < 2
    most_profitable = [0,1]

    (0...stocks.length).each do |idx1|
        (idx1+1...stocks.length).each do |idx2|
            profit = stocks[idx2]-stocks[idx1]
            if profit > stocks[most_profitable[1]] - stocks[most_profitable[0]] 
                most_profitable = [idx1,idx2]
            end
        end
    end
    most_profitable
end