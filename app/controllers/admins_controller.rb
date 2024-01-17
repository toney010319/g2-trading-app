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

  def transactions
    portfolio_transactions = PortfolioTransaction.joins(:user)
                                               .where(transaction_type: ['buy', 'sell', 'transfer'])
                                               .select('portfolio_transactions.*, users.username as user_username, portfolio_transactions.transaction_number')

  
  other_transactions = Transaction.joins(:user)
                                  .where(transaction_type: ['Deposit','Withdraw'])
                                  .select('transactions.*, users.username as user_username, transactions.transaction_number')
                                  

  combined_transactions = portfolio_transactions + other_transactions

  render json: combined_transactions
  end
    def show
      user_data = @user.as_json
      user_data[:balance] = @user.balance
      user_data[:transaction_history] = @user.transactions.order(created_at: :desc).as_json
      render json: user_data
    end


    def create
      @user = User.new(user_params.merge(confirmed_at: Time.now, status: "active", email_confirmed: true))
      if @user.save
        render_user_data(@user)
      else
        render_error(@user.errors)
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
        render json: { 
      user: user_data_hash,
      message: "Account deleted successfully."
    }, status: :ok
      else
        render_error(@user.errors)
      end
    end
  
    def approve
      user = User.find_by(id: params[:id])
      if user
        user.approve!
        render json: { message: 'User approved and email sent.' }, status: :ok
      else
        render json: { error: 'User not found.' }, status: :not_found
      end
    end


    def disapprove
      user = User.find_by(id: params[:id])
      disapproval_message = params[:message]  
      if user
        user.disapprove!  
        AdminMailer.account_disapproved_email(user, disapproval_message).deliver_now
        render json: { message: 'User disapproved and email sent.' }, status: :ok
      else
        render json: { error: 'User not found.' }, status: :not_found
      end
    end

    

    private
    def user_data_hash(user)
      {
        user: user.as_json,
        balance: user.balance,
        transaction_history: user.transactions.order(created_at: :desc).as_json,
         
      }
    end

    def render_user_data(user)
      user_data = user.as_json
      user_data[:balance] = user.balance
      user_data[:transaction_history] = user.transactions.order(created_at: :desc).as_json
      render json: user_data

    end

    def render_error(errors)
      render json: {
        status: {code: 422, message: " #{errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end

    def set_user
      @user = User.find(params[:id])
    end


    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username, :birthday, :status, :first_name, :middle_name, :role, :last_name, :email_confirmed)
    end

    def update_params
      params.require(:user).permit(:first_name, :middle_name, :last_name, :username, :password, :email, :birthday,:role, balance_attributes: [:id, :balance, :forex, :stocks, :crypto])
    end

    def ensure_admin_user!
      unless current_user.admin?
        render json: { error: 'Access denied' }, status: :forbidden
      end
    end
  end
 
