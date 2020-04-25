class PolyTreeNode
    attr_accessor :parent, :children 
    attr_reader :value

    def initialize(value)
        @value = value
        @parent = nil
        @children =[]
    end

    def parent=(new_parent)
        if new_parent == @parent
            return nil
        elsif !@parent.nil?
            @parent.children.delete(self) 
        end

        @parent = new_parent
        @parent.children << self unless @parent.nil?
             
    end

    def remove_child(child)
        if !self.children.include?(child)
            raise "Child does not exist"
        end
        child.parent = nil
    end

    def add_child(child)
        child.parent = self
    end

    def dfs(target)
        return self if target == self.value

        children.each do |child|
            result = child.dfs(target)
            return result if !result.nil?
        end
        nil
    end

    def bfs(target)
        queue = []
        queue << self

        until queue.empty?
            current_node = queue.shift
            return current_node if current_node.value == target
            queue.concat(current_node.children)
        end

        nil
    end
end