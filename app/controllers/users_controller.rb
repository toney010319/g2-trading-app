class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update_password]

  def show
    user = User.find(params[:user_id])
    render json: user
  end

  def update_password
    user = User.find(params[:user_id])

    if user.valid_password?(params[:current_password])
      if user.update(password: params[:new_password])
        render json: { message: 'Password updated successfully' }
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Current password is incorrect' }, status: :unprocessable_entity
    end
  end
end