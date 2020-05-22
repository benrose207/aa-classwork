class EditPostSubId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :posts, :sub_id, true
  end
end
