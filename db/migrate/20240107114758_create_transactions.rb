class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.references :user, foreign_key: true
      t.string :transaction_number, null: false
      t.datetime :date, null: true
      t.float :amount, null: false
      t.string :debit_credit, null: false
      t.string :transaction_type, null: false
      t.string :status, null: false

      t.timestamps
    end
  end
end
