class Currency < ApplicationRecord
  has_many :portfolio_transactions, as: :asset
end
