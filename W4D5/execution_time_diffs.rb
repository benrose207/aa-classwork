def my_min(arr)
    smallest = arr.first
    arr.each_with_index do |num, idx_1|
        (0...arr.length).each do |idx_2|
            if arr[idx_2] < smallest
                smallest = arr[idx_2]
            end
        end
    end
    smallest
end

def my_min(arr)
    smallest = arr.first
    arr.each_with_index do |num, idx_1|
        if num < smallest
            smallest = num
        end
    end
    smallest
end

# list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
# p my_min(list)

def largest_contiguous_subsum(arr)
    subarrays = []

    arr.each_with_index do |num, idx_1|
        (idx_1...arr.length).each do |idx_2|
            subarrays << arr[idx_1..idx_2]
        end
    end

    max = subarrays[0].sum
    (1...subarrays.length - 1).each do |idx|
        max = subarrays[idx].sum if subarrays[idx].sum > max
    end

    max
end

def largest_contiguous_subsum(arr)
    largest_sum = arr[0]
    current_sum = arr[0]
    (1...arr.length).each do |idx|
        unless current_sum < 0
            current_sum += arr[idx]
        else
            current_sum = arr[idx]
        end

        if current_sum > largest_sum
            largest_sum = current_sum
        end
    end
    largest_sum
end

list = [5, 3, -7]
p largest_contiguous_subsum(list) # 8
list_2 = [2, 3, -6, 7, -6, 7]
p largest_contiguous_subsum(list_2) # 8
list_3 = [-5, -1, -3]
p largest_contiguous_subsum(list_3) # -1

# new_arr = [1, 2, -4, 4, -3, 4]
#          1  3  -1  3   0  4

# current  1  3  -1  4   1  5 unless current < 0 then we keep adding
# longest  1  3   3  4   4  5 current > longest longest = current

# new_arr = [-8,-10,-1,-4,-6]
# current  -8 -10 -1 -4 -6
# longest  -8 -8  -1 -1 -1