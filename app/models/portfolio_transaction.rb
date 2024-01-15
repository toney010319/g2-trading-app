class PortfolioTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :asset, polymorphic: true
  
end
