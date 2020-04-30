module Slideable

    HORIZONTAL_DIRS = [[0,1], [1,0], [-1,0], [0,-1]]

    DIAGONAL_DIRS = [[1,1], [-1,1], [1,-1], [-1,-1]]

    def horizontal_dirs
        HORIZONTAL_DIRS
    end

    def diagonal_dirs
        DIAGONAL_DIRS
    end

    def moves
        potential_moves = []
        self.move_dirs.each do |dir|
            potential_moves.concat(grow_unblocked_moves_in_dir(*dir))
        end
        potential_moves
    end

    private

    def grow_unblocked_moves_in_dir(dx, dy)
        new_moves = []
        current_x, current_y = self.position
        current_x, current_y = current_x + dx, current_y + dy

        until self.board.pos_not_on_board?([current_x, current_y]) || self.board[current_x, current_y] != nil
            new_moves << [current_x, current_y]
            current_x, current_y = current_x + dx, current_y + dy
        end

        if self.board[current_x, current_y].color != self.color
            new_moves << [current_x, current_y]
        end

        new_moves
    end

end