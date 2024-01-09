class CreateBalances < ActiveRecord::Migration[7.1]
  def change
    create_table :balances do |t|
      t.references :user, foreign_key: true
      t.decimal :balance
      t.timestamps
    end
  end
end
