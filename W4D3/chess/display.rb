require_relative "board"

class Display

    def initialize(board)
        @board = board
    end

    def render
        @board.board.each do |row|
            row.each do |piece|
                print "#{piece.symbol} "
            end
            puts
        end
    end
end

board = Board.new
display = Display.new(board)
display.render