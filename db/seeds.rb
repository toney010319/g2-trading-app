# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'json'
json_data = File.read(Rails.root.join('data/cryptolist.data 1.9.24.json'))
crypto_data = JSON.parse(json_data)
crypto_data.each do |crypto|
  Cryptocurrency.create(crypto)
end

require 'json'
json_data = File.read(Rails.root.join('data/stocks.data.sorted 1.9.24.json'))
stocks_data = JSON.parse(json_data)
stocks_data.each do |crypto|
  Stock.create(crypto)
end

require 'json'
json_data = File.read(Rails.root.join('data/forex.data.sorted 1.10.24.json'))
currency_data = JSON.parse(json_data)
currency_data.each do |currency|
  Currency.create(currency)
end

admin_user = User.create!(
  email: 'admin@stellarmarkets.com',
  password: 'admin1234',
  confirmed_at: Time.now,
  first_name: 'Admin',
  middle_name: 'Admin',
  last_name: 'User',
  username: 'admin',
  birthday: Date.new(1990, 1, 1),
  email_confirmed: true,
  status: 'active',
  role: 'Admin'
)
