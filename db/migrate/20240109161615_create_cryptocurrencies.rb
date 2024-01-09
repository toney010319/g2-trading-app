class CreateCryptocurrencies < ActiveRecord::Migration[7.1]
  def change
    create_table :cryptocurrencies do |t|
      t.string :symbol
      t.string :name
      t.decimal :price
      t.decimal :changes_percentage
      t.decimal :change
      t.decimal :day_low
      t.decimal :day_high
      t.decimal :year_high
      t.decimal :year_low
      t.decimal :market_cap
      t.string :exchange
      t.decimal :volume
      t.decimal :avg_volume

      t.timestamps
    end
  end
end
