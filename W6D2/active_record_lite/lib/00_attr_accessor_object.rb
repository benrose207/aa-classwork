require "byebug"
class AttrAccessorObject
  def self.my_attr_accessor(*names)
    names.each do |name|
      variable_reference = "@#{name.to_s}"

      define_method(name) do
        self.instance_variable_get(variable_reference)
      end

      define_method("#{name}=") do |value|
        self.instance_variable_set(variable_reference, value)
      end
    end
  end
end
