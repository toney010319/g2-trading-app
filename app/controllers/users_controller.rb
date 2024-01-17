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
