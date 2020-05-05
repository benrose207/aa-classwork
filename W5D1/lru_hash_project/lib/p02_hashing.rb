require "byebug"

class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    result = ""
    self.each do |ele|
      if ele.is_a?(String)
        result << ele.hash.to_s
      elsif ele.is_a?(Integer)
        result << ele.to_s
      end
    end

    result.to_i.hash
  end
end

class String
  def hash
    alpha = ("a".."z").to_a
    result = ""
    self.each_char do |char|
      result << alpha.index(char).to_s
    end
    (result.to_i.hash).abs
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    arr = self.sort_by { |k, v| v }
    flattened = arr.flatten 
    flattened.hash
    0
  end
end


