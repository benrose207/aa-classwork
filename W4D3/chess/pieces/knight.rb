require_relative "piece.rb"
require_relative "stepable"

class Knight < Piece
    include Stepable

    def move_diffs
        arr = [[2,1],[1,2],[-2,1],[-2,-1],[-1,2],[-1,-2],[2,-1],[1,-2]]
    end

    def symbol
        if self.color == :black
            ♘
        else
            ♞
        end
    end

end