class AdminsController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    before_action :ensure_admin_user!
   before_action :authenticate_user!
    def index
      @users = User.all
      render json: @users
    end
  
   
    def show
      render json: @user
    end
  
    
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created 
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
 
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
   
    def destroy
      @user.destroy
      if @user.destroyed?
        head :no_content
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    private
  
  
    def set_user
      @user = User.find(params[:id])
    end
  
   
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    
    end

    private

  def ensure_admin_user!
    unless current_user.admin?
      render json: { error: 'Access denied' }, status: :forbidden
    end
  end
  end