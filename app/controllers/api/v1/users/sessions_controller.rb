module Api
  module V1
    module Users
      class SessionsController < ApplicationController
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
      end
    end
  end
end