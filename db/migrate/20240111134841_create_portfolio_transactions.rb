class CreatePortfolioTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :portfolio_transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :quantity
      t.decimal :price
      t.string :symbol
      t.string :transaction_type
      t.references :asset, polymorphic: true, null: false

      t.timestamps
    end
  end
end
