require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :next_mover_mark, :board, :prev_move_pos
  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
    nil
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    children_nodes = []
    (0...3).each do |row|
      (0...3).each do |col|
        pos = [row, col]
        if @board.empty?(pos)
          self.next_mover_mark == :x ? next_mark = :o : next_mark = :x
          copy_board = @board.dup
          copy_board[pos] = self.next_mover_mark
          children_nodes << TicTacToeNode.new(copy_board, next_mark, pos)
        end
      end
    end
    children_nodes
  end
  
=begin
Recursive case:
It is the player's turn, and all the children nodes are losers for the player 
(anywhere they move they still lose), OR
It is the opponent's turn, and one of the children nodes 
is a losing node for the player 
(assumes your opponent plays perfectly; 
they'll force you to lose if they can).
=end

  def losing_node?(evaluator)
    if self.board.over? 
      return self.board.winner != evaluator && self.board.winner != nil
    end
    
    if self.next_mover_mark == evaluator
      self.children.all? { |child_node| child_node.losing_node?(evaluator) }
    else
      self.children.any? { |child_node| child_node.losing_node?(evaluator) }
    end
  end

  def winning_node?(evaluator)
    if self.board.over? 
      return self.board.winner == evaluator
    end

    if self.next_mover_mark == evaluator
      self.children.any? { |child_node| child_node.winning_node?(evaluator) }
    else
      self.children.all? { |child_node| child_node.winning_node?(evaluator) }
    end    
  end
end
