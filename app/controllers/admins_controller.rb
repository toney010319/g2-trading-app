class AdminsController < ApplicationController
    before_action :authenticate_user!
    before_action :ensure_admin_user!
    before_action :set_user, only: [:show, :update, :destroy]
   def index
    users = User.includes(:balance, :transactions).all
    users_with_additional_info = users.map do |user|
      user_attributes = user.attributes
      user_attributes[:balance] = user.balance
      user_attributes[:transaction_history] = user.transactions.order(created_at: :desc)
      user_attributes
    end
    render json: users_with_additional_info
  end


    def show
      user_data = @user.as_json
      user_data[:balance] = @user.balance
      user_data[:transaction_history] = @user.transactions.order(created_at: :desc).as_json

      render json: user_data
    end


    def create
      @user = User.new(user_params.merge(confirmed_at: Time.now, status: "active"))
      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end


    def update
      if @user.update(update_params)
        render_user_data(@user)
      else
        render_error(@user.errors)
      end
    end


    def destroy
      user_data_hash = user_data_hash(@user) 
      @user.destroy
      if @user.destroyed?
        render json: user_data_hash, status: :ok  
      else
        render_error(@user.errors)
      end
    end
  
  
    private
    def user_data_hash(user)
      {
        user: user.as_json,
        balance: user.balance,
        transaction_history: user.transactions.order(created_at: :desc).as_json
      }
    end

    def render_user_data(user)
      user_data = user.as_json
      user_data[:balance] = user.balance
      user_data[:transaction_history] = user.transactions.order(created_at: :desc).as_json
      render json: user_data

    end

    def render_error(errors)
      render json: errors, status: :unprocessable_entity
    end

    def set_user
      @user = User.find(params[:id])
    end


    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username, :birthday, :status, :first_name, :middle_name, :role, :last_name, )
    end

    def update_params
      params.require(:user).permit(:first_name, :middle_name, :last_name, :username, :password, :email, :birthday, balance_attributes: [:id, :balance, :forex, :stocks, :crypto])
    end

    def ensure_admin_user!
      unless current_user.admin?
        render json: { error: 'Access denied' }, status: :forbidden
      end
    end
  end
 
