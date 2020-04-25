require_relative "./00_tree_node.rb"

class KnightsTravails

    def initialize(pos)
        @start = pos
        @root_node = PolyTreeNode.new(pos)
        @considered_positions = [pos]

        self.build_move_tree
    end

    def self.valid_moves(pos)
        valid_moves = []
        row, col = pos
        array = [[-1,2],[-1,-2],[1,2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1]]
        array.each do |subarray|
            new_arr = [row + subarray[0],col + subarray[-1]]
            valid_moves << new_arr if new_arr.all? { |idx| idx >= 0 && idx < 8}
        end
        valid_moves
    end

    def new_move_positions(pos)
       valid = KnightsTravails.valid_moves(pos)
       new_moves = valid.reject {|position| @considered_positions.include?(positions)}
       @considered_positions.concat(new_moves)
       new_moves
    end

    def build_move_tree
    end
end