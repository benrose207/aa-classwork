require_relative "piece.rb"
require_relative "slideable"


class Rook < Piece
    include Slideable

    def move_dirs
        self.horizontal_dirs
    end

    def symbol
        if self.color == :black
            @symbol = ♖
        else
            @symbol = ♜
        end
    end

end
