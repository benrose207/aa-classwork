
require_relative "piece.rb"
require "byebug"

class NoStartPosError < StandardError ; end


class Board

    def initialize
        @board = Array.new(8) { Array.new(8) }
        @board.each_with_index do |sub, idx|
            sub.each_with_index do |field, idx2| 
                if [0,1].include?(idx)
                    @board[idx][idx2] = Piece.new(:black, [idx, idx2], @board)
                elsif [6,7].include?(idx)
                    @board[idx][idx2] = Piece.new(:white, [idx, idx2], @board)
                end
            end
        end
    end

    # update move_pieces method to actually change the pos instance variable on the Piece class
    def move_piece(start_pos, end_pos)
        raise "Invalid position" if self.pos_not_on_board?(start_pos) || self.pos_not_on_board?(end_pos)
        raise NoStartPosError if self[start_pos].nil?
        cur_piece = self[start_pos]
        self[end_pos] = cur_piece
        self[start_pos] = nil
    end

    def pos_not_on_board?(pos)
        pos.any? { |idx| idx < 0 || idx > 7 }
    end

    def [](pos)
        row, col = pos
        @board[row][col]
    end

    def []=(pos, piece)
        row, col = pos
        @board[row][col] = piece
    end

end

b = Board.new
p b
b.move_piece([4,4],[8,1])
p b
