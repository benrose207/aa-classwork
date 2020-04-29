class Piece

    # Need to come back to how we pass in baord instance. Currently passing in 2D grid, not an actual instance of Board.

    def initialize(color, position, board)
        @color = color
        @position = position
        @board = board
    end

end