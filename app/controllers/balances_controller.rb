class BalancesController < ApplicationController
before_action :authenticate_user!, only: [:add_balance, :index , :show ]

def add_balance
  user = User.find(params[:user_id])
  amount = params[:balance].to_f
  user.balance.balance += amount
  user.balance.save
  render json: { balance: user.balance.balance }
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
