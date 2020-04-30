require_relative "piece.rb"

class Pawn < Piece

    def symbol
        if self.color == :black
            ♟
        else
            ♙
        end
    end

    def moves
        forward_steps.concat(side_attacks)
    end

    private

    def at_start_row?
        if self.color == :black && self.position.first == 1
            return true
        elsif self.color == :white && self.position.first == 6
            return true
        end
        false
    end

    def forward_dir
        if self.color == :black
            return 1
        else
            return -1
        end
    end

    def forward_steps
        potential_moves = []

        if self.at_start_row?
            new_pos = [self.position[0] + 2 * forward_dir, self.position[1]]
            potential_moves << new_pos unless self.board[new_pos].nil?
        end

        one_step = [self.position[0] + 1 * forward_dir, self.position[1]]

        potential_moves << one_step unless self.board[new_pos].nil?

        potential_moves
    end

    def side_attacks
        potential_moves = []

        left_dia = [1,1].map { |idx| idx * forward_dir }
        right_dia = [1,-1].map { |idx| idx * forward_dir }
        
        left_attack = [left_dia[0] + self.position[0], left_dia[1] + self.position[1]]
        right_attack = [right_dia[0] + self.position[0], right_dia[1] + self.position[1]]

        if self.board[left_attack].color != self.color
            potential_moves << left_attack
        end
        
        if self.board[right_attack].color != self.color
            potential_moves << left_attack
        end

        potential_moves
    end

end