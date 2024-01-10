class CreateBalances < ActiveRecord::Migration[7.1]
  def change
    create_table :balances do |t|
      t.references :user, foreign_key: true
      t.decimal :balance
      t.decimal :crypto
      t.decimal :stocks
      t.decimal :forex
      t.timestamps
    end
  end
end
