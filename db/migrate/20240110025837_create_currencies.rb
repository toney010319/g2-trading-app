class CreateCurrencies < ActiveRecord::Migration[7.1]
  def change
    create_table :currencies do |t|
      t.string :symbol
      t.string :name
      t.string :country
      t.float :price
      t.float :changes_percentage
      t.float :change
      t.float :day_low
      t.float :day_high
      t.float :year_high
      t.float :year_low
      t.float :market_cap
      t.integer :volume

      t.timestamps
    end
  end
end
