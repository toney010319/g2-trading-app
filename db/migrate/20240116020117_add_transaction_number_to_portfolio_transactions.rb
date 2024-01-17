class AddTransactionNumberToPortfolioTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :portfolio_transactions, :transaction_number, :string
    add_index :portfolio_transactions, :transaction_number, unique: true
  end
end