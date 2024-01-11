class Stock < ApplicationRecord
  has_many :portfolio_transactions, as: :asset
end
