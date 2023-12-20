class Api::AuthController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
    
        if user&.valid_password?(params[:password])
          render json: { token: user.generate_jwt }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
end
