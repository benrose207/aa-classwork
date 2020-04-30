require_relative "pieces.rb"
require "byebug"

class NoStartPosError < StandardError ; end

class Board

    attr_reader :board

    def initialize
        @board = Array.new(8) { Array.new(8) }
        self.place_pieces
    end

    def place_pieces
        @board.each_with_index do |sub, idx|
            sub.each_with_index do |field, idx2| 
                if idx == 1
                    @board[idx][idx2] = Pawn.new(:black, [idx, idx2], self)
                elsif idx == 6
                    @board[idx][idx2] = Pawn.new(:white, [idx, idx2], self)
                end
            end
        end

        self.board[0][0] = Rook.new(:black, [0, 0], self)
        self.board[0][7] = Rook.new(:black, [0, 7], self)
        self.board[0][1] = Knight.new(:black, [0, 1], self)
        self.board[0][6] = Knight.new(:black, [0, 6], self)
        self.board[0][2] = Bishop.new(:black, [0, 2], self)
        self.board[0][5] = Bishop.new(:black, [0, 5], self)
        self.board[0][3] = King.new(:black, [0, 3], self)
        self.board[0][4] = Queen.new(:black, [0, 4], self)

        self.board[7][0] = Rook.new(:white, [7, 0], self)
        self.board[7][7] = Rook.new(:white, [7, 7], self)
        self.board[7][1] = Knight.new(:white, [7, 1], self)
        self.board[7][6] = Knight.new(:white, [7, 6], self)
        self.board[7][2] = Bishop.new(:white, [7, 2], self)
        self.board[7][5] = Bishop.new(:white, [7, 5], self)
        self.board[7][3] = King.new(:white, [7, 3], self)
        self.board[7][4] = Queen.new(:white, [7, 4], self)
    end

    def move_piece(start_pos, end_pos)
        raise "Invalid position" if self.pos_not_on_board?(start_pos) || self.pos_not_on_board?(end_pos)
        raise NoStartPosError if self[start_pos].nil?
        cur_piece = self[start_pos]
        self[end_pos] = cur_piece
        self[start_pos] = nil
        cur_piece.position = end_pos
    end

    def pos_not_on_board?(pos)
        pos.any? { |idx| idx < 0 || idx > 7 }
    end

    def [](pos)
        row, col = pos
        self.board[row][col]
    end

    def []=(pos, piece)
        row, col = pos
        self.board[row][col] = piece
    end

end
