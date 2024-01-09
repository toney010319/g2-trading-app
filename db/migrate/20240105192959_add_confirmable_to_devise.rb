class AddConfirmableToDevise < ActiveRecord::Migration[7.1]
  def change
    # add_column :users, :confirmed_at, :datetime
    # add_column :users, :confirmation_sent_at, :datetime
    # add_column :users, :confirmation_token, :string
    # add_index :users, :confirmation_token, unique: true

    # User.reset_column_information # Need for some types of updates, but not for adding a column.
    User.update_all(confirmed_at: Time.now) # For existing records without confirmable
  end
end