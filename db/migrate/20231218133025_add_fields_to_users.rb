class AddFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :username, :string
    add_column :users, :birthday, :date
    add_column :users, :email_confirmed, :boolean
    add_column :users, :status, :string
    add_column :users, :role, :string
  end
end
