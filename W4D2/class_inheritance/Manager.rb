require_relative "Employee.rb"

class Manager < Employee
    attr_reader :employees

    def initialize(name, title, salary, boss = nil)
        super
        @employees = []
    end

    def bonus(multiplier)
        total_salaries = 0
        queue = @employees

        until queue.empty?
            emp = queue.shift
            total_salaries += emp.salary
            queue.concat(emp.employees) if emp.is_a?(Manager)
        end

        total_salaries * multiplier
    end

    def add_employee(employee)
        @employees << employee
    end

end

p david = Employee.new("David", "TA", 10000, "Darren")
p shawna = Employee.new("Shawna", "TA", 12000, "Darren")
p darren = Manager.new("Darren", "TA Manager", 78000, "Ned")
p ned = Manager.new("Ned", "Founder", 1000000)

ned.add_employee(darren)
darren.add_employee(shawna)
darren.add_employee(david)

p ned.bonus(5) # => 500_000
p darren.bonus(4) # => 88_000
p david.bonus(3) # => 30_000