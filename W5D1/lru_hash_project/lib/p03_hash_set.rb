class HashSet
  attr_accessor :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    resize! if self.count == num_buckets
    if !self.include?(key)
      self[key] << key
      self.count += 1
    end
  end
  
  def include?(key)
    self[key].include?(key)
  end
  
  def remove(key)
    if self.include?(key)
      self[key].delete(key)
      self.count -= 1
    end
  end
  
  private
  
  def [](key)
    @store[key.hash % num_buckets]
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_arr = Array.new(num_buckets * 2) { [] }
    @store.flatten.each do |ele|
      idx = ele.hash % new_arr.length
      new_arr[idx] << ele
    end

    @store = new_arr
  end
end
