require "byebug"

def bad_two_sum?(arr, target_sum) # O(n^2)
    arr.each_with_index do |ele, idx_1|
        (idx_1 + 1...arr.length).each do |idx_2|
            return true if ele + arr[idx_2] == target_sum
        end
    end 
    false
end


def two_sum?(arr, target_sum)
    arr.sort! # n log n
    pivot = target_sum / 2

    left = []
    right = []
    arr.each_with_index do |num| # n
        if num <= pivot
            left << num
        else
            right << num
        end
    end
    
    left.each_with_index do |num, idx| #n
        num_search = target_sum - num
        return true if right.bsearch { |x| num_search <=> x } # log n
    end # n log n
    false
end

# assume it's sorted
# take the target, divide by two. Split the array here (pivot)
# iterate through the left side of the array. For each number, look for it on the other side of the array.

# n log n -- sorting
# binary search = log n
# n / 2 - sorting through left half
# for right half, we know exactly what element we want (binary search)
# n  + logn

def two_sum?(arr, target_sum)
    hash = Hash.new(0)
    arr.each {|num| hash[num] += 1 }
    hash.each do |key, value|
        differance = target_sum - key
        if differance == key
            return true if value > 1
        else
            val = hash.has_value?(differance)
            return true if val
        end
    end
    false
end

arr = [1, 0, 5, 7]
p two_sum?(arr, 6) # => should be true
p two_sum?(arr, 10) # => should be false