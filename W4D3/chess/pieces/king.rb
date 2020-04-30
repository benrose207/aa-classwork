require_relative "piece.rb"
require_relative "stepable"

class King < Piece
    include Stepable

    def move_diffs
        arr = [[0,1], [1,0], [-1,0], [0,-1], [1,1], [-1,1], [1,-1], [-1,-1]]
    end

    def symbol
        if self.color == :black
            ♔
        else
            ♚
        end
    end

end