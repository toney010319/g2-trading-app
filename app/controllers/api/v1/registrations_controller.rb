class Api::V1::RegistrationsController < ApplicationController
  def create
    user = User.new(sign_up_params)

    if user.save
      render json: user
    else
      render json: { errors: user.errors }
    end
  end

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  private

  def sign_up_params
    params.permit(:email, :password, :first_name, :last_name, :middle_name, :username, :birthday, :status)
  end
end
