class Balance < ActiveRecord::Base
  # include ActiveRecord::Attributes
    belongs_to :user
    # decimal :amount, precision: 10, scale: 2
end
