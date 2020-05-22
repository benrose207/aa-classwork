class RenameDigestColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :password_digeset, :password_digest
  end
end
