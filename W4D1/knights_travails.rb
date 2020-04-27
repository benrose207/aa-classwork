require_relative "./PolyTreeNode_project/lib/00_tree_node.rb"

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
       new_moves = valid.reject {|position| @considered_positions.include?(position)}
       @considered_positions.concat(new_moves)
       new_moves
    end

    def build_move_tree
        queue = [@root_node]
        until queue.empty?
            current_node = queue.shift
            current_pos = current_node.value
            self.new_move_positions(current_pos).each do |pos|
                new_node = PolyTreeNode.new(pos)
                queue << new_node
                current_node.add_child(new_node)
            end
        end

    end

    def find_path(end_pos)
        end_node = @root_node.dfs(end_pos)

        trace_path_back(end_node)
    end

    def trace_path_back(end_node)
        path = [end_node.value]
        current_parent_node = end_node.parent
        until current_parent_node.nil?
            previous_pos = current_parent_node.value
            path.unshift(previous_pos)
            current_parent_node = current_parent_node.parent
        end

        path
    end
end