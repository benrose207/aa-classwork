def anagram?(str1, str2)
    possible_anagrams = str1.split("").permutation.to_a
    possible_anagrams.any? do |anagram|
        str2 == anagram.join("")
    end
end

# n!

def anagram?(str1, str2)
    str_array = str2.split("")

    str1.each_char do |char|
        other_idx = str_array.index(char)
        str_array.delete_at(other_idx) unless other_idx.nil?
    end

    str_array.empty?
end

# n * m

def anagram?(str1, str2)
    str_1_array = str1.split("").sort
    str_2_array = str2.split("").sort

    str_1_array == str_2_array
end

# n log n


def anagram?(str1, str2)
    hash_1 = Hash.new(0)
    hash_2 = Hash.new(0)
    str1.each_char.with_index do |char, idx|
        hash_1[char] += 1
    end
    str2.each_char.with_index do |char, idx|
        hash_2[char] += 1
    end

    hash_1 == hash_2
end

# n

def anagram?(str1, str2)
    hash_1 = Hash.new(0)
    str1.each_char.with_index do |char, idx|
        hash_1[char] += 1
    end
    str2.each_char.with_index do |char, idx|
        hash_1[char] -= 1
    end

    hash_1.all? { |key, val| val == 0 }
end

p anagram?("gizmo", "sally")    #=> false
p anagram?("elvis", "lives")    #=> true

