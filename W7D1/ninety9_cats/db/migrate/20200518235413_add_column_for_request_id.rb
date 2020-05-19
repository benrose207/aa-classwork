class AddColumnForRequestId < ActiveRecord::Migration[5.2]
  def change
    add_column :cat_rental_requests, :renter_id, :integer
    add_index :cat_rental_requests, :renter_id
  end
end
