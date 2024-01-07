class BalancesController < ApplicationController
before_action :authenticate_user!, only: [:add_balance ]

 def add_balance
    user = User.find(params[:user_id])
    user.balance.balance += params[:balance].to_f
    user.balance.save

    render json: { balance: user.balance.balance }
  end

  def show
    @balances = Balance.all

    render json: @balances
  end
end
