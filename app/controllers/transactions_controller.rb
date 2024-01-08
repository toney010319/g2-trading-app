class TransactionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :index, :show]

  def create
    user = User.find(params[:user_id])
    amount = params[:balance].to_f

    transaction_number = rand(100_000..999_999).to_s
    transaction_type, transfer_type = if amount.positive?
                                        ['Deposit', '']
                                      else
                                        ['Withdraw', '']
                                      end

    if amount < 0
      debit_credit = 'Credit'
      amount = amount.abs
    else
      debit_credit = 'Debit'
    end

    case params[:transaction_category]
    when 'transfer_stocks'
      transfer_type = ' Stocks'
    when 'transfer_crypto'
      transfer_type = ' Crypto'
    when 'transfer_forex'
      transfer_type = ' Forex'
    when 'buy_stocks'
      transfer_type = ' Stocks'
    when 'buy_crypto'
      transfer_type = ' Crypto'
    when 'buy_forex'
      transfer_type = ' Forex'
    end

    transaction_type += transfer_type

    user.transactions.create!(
      transaction_number: transaction_number,
      date: params[:date],
      amount: amount,
      debit_credit: debit_credit,
      transaction_type: transaction_type,
      status: 'success'
    )

    render json: { balance: user.balance.balance, transaction_number: transaction_number }
  end

  def index
    user = User.find(params[:user_id])
    @user_transactions = user.transactions.order(created_at: :desc)
    render json: @user_transactions
  end

  def show
    @all_transactions = Transaction.all
    render json: @all_transactions
  end
end
