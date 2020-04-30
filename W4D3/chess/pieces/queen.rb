require_relative "./piece.rb"
require_relative "slideable"


class Queen < Piece
    include Slideable

    def move_dirs
        self.horizontal_dirs + self.diagonal_dirs
    end

    def symbol
        if self.color == :black
            ♕
        else
            ♛
        end
    end

end

