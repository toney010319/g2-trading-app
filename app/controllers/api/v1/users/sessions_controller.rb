# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    user = User.find_by(email: params[:email])
  
    if user&.valid_password?(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: user, token: token, notice: 'You have successfully logged in'}, status: :ok
    else
      render json:  { error: 'Invalid email or password'} , status: :unauthorized
       
    end
  end

  private

  def encode_token(payload)
    JWT.encode(payload, '123456789')
  end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
