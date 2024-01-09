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
