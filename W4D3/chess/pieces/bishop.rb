require_relative "./piece.rb"
require_relative "slideable"

class Bishop < Piece
    include Slideable

    def move_dirs
        self.diagonal_dirs
    end

    def symbol
        if self.color == :black
            ♗
        else
            ♝
        end
    end

end

