
module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        def create
          puts params.inspect
          user = User.new(sign_up_params)

          if user.save
            render json: user ,status: :ok
          else
            render json: { errors: user.errors.full_messages }, status: :unauthorized
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
          # params.require(:registration).permit(:username, :first_name, :middle_name, :last_name, :email, :birthday, :password)
          params.require(:registration).permit(:username, :first_name, :middle_name, :last_name, :email, :birthday, :password)
        end
      end
    end
  end
end
