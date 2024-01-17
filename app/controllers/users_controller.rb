class UsersController < ApplicationController

    def show
        user = User.find(params[:user_id])
        render json: user
    end
    def contact_support
        user = User.find_by(id: params[:id])
        message = params[:message]
        support = params[:support]
        subject = params[:subject]
    
        if message.present?
          SupportMailer.contact_support_email(user, message,subject).deliver_now
          render json: { message: 'Support request sent.' }, status: :ok
        else
          render json: { error: 'Message cannot be blank.' }, status: :unprocessable_entity
        end
      end

end

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