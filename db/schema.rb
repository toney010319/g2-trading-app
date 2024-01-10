# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_10_025837) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "balances", force: :cascade do |t|
    t.bigint "user_id"
    t.decimal "balance"
    t.decimal "crypto"
    t.decimal "stocks"
    t.decimal "forex"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_balances_on_user_id"
  end

  create_table "cryptocurrencies", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.decimal "price"
    t.decimal "changes_percentage"
    t.decimal "change"
    t.decimal "day_low"
    t.decimal "day_high"
    t.decimal "year_high"
    t.decimal "year_low"
    t.decimal "market_cap"
    t.string "exchange"
    t.decimal "volume"
    t.decimal "avg_volume"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "currencies", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.string "country"
    t.float "price"
    t.float "changes_percentage"
    t.float "change"
    t.float "day_low"
    t.float "day_high"
    t.float "year_high"
    t.float "year_low"
    t.float "market_cap"
    t.integer "volume"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.decimal "price"
    t.decimal "changes_percentage"
    t.decimal "change"
    t.decimal "day_low"
    t.decimal "day_high"
    t.decimal "year_high"
    t.decimal "year_low"
    t.bigint "market_cap"
    t.string "exchange"
    t.integer "volume"
    t.integer "avg_volume"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "user_id"
    t.string "transaction_number", null: false
    t.datetime "date"
    t.float "amount", null: false
    t.string "debit_credit", null: false
    t.string "transaction_type", null: false
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "username"
    t.date "birthday"
    t.boolean "email_confirmed"
    t.string "status"
    t.string "role"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "balances", "users"
  add_foreign_key "transactions", "users"
end
