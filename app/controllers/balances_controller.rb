class BalancesController < ApplicationController
  before_action :authenticate_user!

def add_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f
  user.balance.balance += amount
  user.balance.save
  render json: { balance: user.balance.balance }
end

def add_stock_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f
 # Ensure that amount parameter is present
 if amount.blank?
  render json: {
      status: { code: 422, message: "Amount is required" }
    } ,status: :unprocessable_entity
  return
end
if amount <= 0
  render json: {
      status: { code: 422, message: "Invalid Transfer Amount" }
    },status: :unprocessable_entity
  return
end

  usdphp_conversion_rate = 0.01778584
  amount_usd = amount * usdphp_conversion_rate
  amount_php = amount_usd / usdphp_conversion_rate

  if user.balance.balance < amount
    render json: {
      status: { code: 422, message: "Not enough Balance to transfer." }
    } ,status: :unprocessable_entity
    return
  end
  user.balance.stocks += amount_usd
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)

    render json: {
      message: "Transfer successful",
      stocks_balance: user.balance.stocks,
      main_balance: user.balance.balance,
      amount: amount_php,
      status: 200
    }, status: :ok
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_stock_balance
  user = User.find(params[:user_id])
  amount_usd = params[:balance].to_f

  if amount_usd.blank?
    render json: {
        status: { code: 422, message: "Amount is required" }
      }, status: :unprocessable_entity 
    return
  end
  if amount_usd <= 0
    render json: {
        status: { code: 422, message: "Invalid amount" }
      }, status: :unprocessable_entity 
    return
  end

  if user.balance.stocks < amount_usd
    render json: {
        status: { code: 422, message: "Not enough balance to transfer" }
      }, status: :unprocessable_entity
    return
  end
  conversion_rate = 56.15
  amount_php = amount_usd * conversion_rate

  user.balance.stocks -= amount_usd
  user.balance.balance += amount_php

  if user.balance.save && (!user.username_changed? || user.save)
    
    render json: {
      message: "Transfer successful",
      stocks_balance: user.balance.stocks,
      main_balance: user.balance.balance,
      amount: amount_php,
      status: 200
    }, status: :ok
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end


def add_crypto_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  usdphp_conversion_rate = 0.01778584
  amount_usd = amount * usdphp_conversion_rate

  user.balance.crypto += amount_usd
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { crypto_balance: user.balance.crypto, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_crypto_balance
  user = User.find(params[:user_id])
  amount_usd = params[:balance].to_f

  conversion_rate = 56.15
  amount_php = amount_usd * conversion_rate

  user.balance.crypto -= amount_usd
  user.balance.balance += amount_php

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { crypto_balance: user.balance.crypto, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def add_forex_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  usdphp_conversion_rate = 0.01778584
  amount_usd = amount * usdphp_conversion_rate

  user.balance.forex += amount_usd
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { forex_balance: user.balance.forex, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_forex_balance
  user = User.find(params[:user_id])
  amount_usd = params[:balance].to_f

  conversion_rate = 56.15
  amount_php = amount_usd * conversion_rate

  user.balance.forex -= amount_usd
  user.balance.balance += amount_php

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { forex_balance: user.balance.forex, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

  def index
    user = User.find(params[:user_id])
    @user_balances = user.balance
    render json: @user_balances
  end

  def show
    @all_balances = Balance.all
    render json: @all_balances
  end
end
