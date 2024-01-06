class CreateBalances < ActiveRecord::Migration[7.1]
  def change
    create_table :balances do |t|
      t.references :user, foreign_key: true
      t.float :amount

      t.timestamps
    end
  end
end
