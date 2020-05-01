class Towers
    attr_accessor :stack_1, :stack_2, :stack_3
    attr_reader :stacks 

    def initialize(game_size)
        @game_size = game_size
        @stack_1 = []
        @stack_2 = []
        @stack_3 = []
        @stacks = [@stack_1, @stack_2, @stack_3]

        i = game_size
        while i > 0
            stack_1.unshift(i)
            i -= 1
        end
    end

    def valid_move?(move)
        return false if move.length != 2
        return false if !move.all? {|stack| stack.is_a?(Integer)}
        start_stack = move[0] - 1
        end_stack = move[1] - 1
        start_top_disc = @stacks[start_stack][0] 
        end_top_disc =  @stacks[end_stack][0]  
        return false if start_top_disc == nil 
        return true if end_top_disc == nil
        end_top_disc > start_top_disc
    end

    def move(move)
        start_stack = move[0] - 1
        end_stack = move[1] - 1
        @stacks[end_stack].unshift(@stacks[start_stack].shift)
    end

    def won?
        @stacks[1..2].one? { |stack| stack.length == @game_size }
    end

    def play

        until self.won?
            self.render 

            puts "Enter a move (starting_stack ending_stack)"

            move = gets.chomp.split(" ").map(&:to_i)
            if !self.valid_move?(move)
                puts "Invalid Move!"
            else
                self.move(move)
            end

        end
        puts "you won!"
    end

    def render
        @stacks.each_with_index {|stack,i| puts "Stack #{i+1}: #{stack}"  }
    end

end

game = Towers.new(3)

game.play