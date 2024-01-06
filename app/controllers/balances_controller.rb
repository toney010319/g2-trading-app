class BalancesController < ApplicationController

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

  # private

  # def authenticate_user
  #   return if controller_name == 'registrations'
  #   auth_token = request.headers['Authorization'].split(' ').last
  #   @current_user = User.find_by(auth_token: auth_token)
  # end

end
