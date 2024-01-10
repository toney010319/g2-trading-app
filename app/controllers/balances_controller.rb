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

  user.balance.stocks += amount
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { stocks_balance: user.balance.stocks, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_stock_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  user.balance.stocks -= amount
  user.balance.balance += amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { stocks_balance: user.balance.stocks, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def add_crypto_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  user.balance.crypto += amount
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { crypto_balance: user.balance.crypto, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_crypto_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  user.balance.crypto -= amount
  user.balance.balance += amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { crypto_balance: user.balance.crypto, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def add_forex_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  user.balance.forex += amount
  user.balance.balance -= amount

  if user.balance.save && (!user.username_changed? || user.save)
    render json: { forex_balance: user.balance.forex, main_balance: user.balance.balance }
  else
    render json: { error: "Failed to update balances" }, status: :unprocessable_entity
  end
end

def revert_forex_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f

  user.balance.forex -= amount
  user.balance.balance += amount

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
