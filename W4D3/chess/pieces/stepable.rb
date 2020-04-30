module Stepable

    def moves
        potential_moves = []
        self.move_diffs.each do |dir|
            new_move = self.position.map.with_index { |ele, i| ele += dir[i] }
            unless self.board.pos_not_on_board?(new_move) || self.board[new_move].color == self.color
                potential_moves << new_move
            end
        end
        potential_moves
    end

end