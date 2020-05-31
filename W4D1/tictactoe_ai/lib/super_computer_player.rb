require_relative 'tic_tac_toe_node'

class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)
    current_node = TicTacToeNode.new(game.board, mark)
    children = current_node.children
    children.each do |child|
      return child.prev_move_pos if child.winning_node?(mark)
    end
    children.each do |child|
      return child.prev_move_pos unless child.losing_node?(mark)
    end
    raise "It cannot find a winning or draw inducing move"
  end
end

if __FILE__ == $PROGRAM_NAME
  puts "Play the computer!"
  hp = HumanPlayer.new("Human")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
