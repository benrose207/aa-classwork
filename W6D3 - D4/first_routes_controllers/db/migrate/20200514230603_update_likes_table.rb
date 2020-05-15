class UpdateLikesTable < ActiveRecord::Migration[5.2]
  def change
    remove_index :likes, [:likeable_type, :likeable_id]
    add_index :likes, [:likeable_type, :likeable_id, :liker_id], unique: true
    add_index :likes, [:likeable_type, :likeable_id]

  end
end
