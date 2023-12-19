class Api::V1::RegistrationsController < ApplicationController
  def create
    user = User.new(sign_up_params)
    user.first_name = sign_up_params[:first_name]
    user.middle_name = sign_up_params[:middle_name]
    user.last_name = sign_up_params[:last_name]
    user.username = sign_up_params[:username]
    user.birthday = sign_up_params[:birthday]
    user.email_confirmed = sign_up_params[:email_confirmed]
    user.status = sign_up_params[:status]
    user.role = sign_up_params[:role]

    if user.save
      render json: user
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def index

  end

  def show
    render json: User.find(params[:id])
  end


  private

  def sign_up_params
    params.require(:user).permit(:first_name, :middle_name, :last_name, :username, :email, :password, :password_confirmation, :birthday, :email_confirmed, :status, :role)
  end
end
