class BalancesController < ApplicationController

  def add_balance
    current_user.balance.amount += params[:amount]
    current_user.balance.save

    render json: { balance: current_user.balance }
  end

  # private

  # def authenticate_user
  #   return if controller_name == 'registrations'
  #   auth_token = request.headers['Authorization'].split(' ').last
  #   @current_user = User.find_by(auth_token: auth_token)
  # end

end
