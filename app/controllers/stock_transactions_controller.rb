class StockTransactionsController < ApplicationController
  before_action :authenticate_user!
  def buy
    user = User.find(params[:user_id])
    quantity = params[:quantity]
    price = params[:price]
    symbol = params[:symbol]
    @transaction_number = rand(100_000..999_999).to_s
    total_cost = quantity.to_i * price.to_f

    stock = Stock.find_by(symbol: symbol)
    unless stock.present?
      render json: { success: false, message: 'Invalid stock symbol' },status: :unprocessable_entity
      return
    end
    if user.balance.stocks.to_f < total_cost.to_f
      render json: { success: false, message: 'Not enough stock wallet balance' }, status: :unprocessable_entity
      return
    end
    if quantity.to_i <= 0
      render json: { success: false, message: 'Please enter a valid quantity' }, status: :unprocessable_entity
      return
    end

    result = update_user_balance(total_cost)

    if result[:success]
      PortfolioTransaction.create!(
        user_id: user.id,
        quantity: quantity.to_i,
        price: price.to_f,
        symbol: symbol,
        transaction_type: 'buy',
        asset: stock,
        transaction_number: @transaction_number
      )
      render json: { success: true, message: 'Stock purchased successfully' } ,status: :ok
    else
      render json: { success: false, error: result[:error] }, status: :unprocessable_entity
    end
  end

  def sell
    user = User.find(params[:user_id])
    quantity = params[:quantity].to_i
    price = params[:price].to_f
    symbol = params[:symbol]
    @transaction_number = rand(100_000..999_999).to_s
    total_sale_value = quantity * price

    stock = Stock.find_by(symbol: symbol)
    unless stock.present?
      render json: { success: false, message: 'Invalid stock symbol' }
      return
    end

    result = update_user_balance_sell(user, total_sale_value)

    if result[:success]
      PortfolioTransaction.create!(
        user_id: user.id,
        quantity: quantity,
        price: price,
        symbol: symbol,
        transaction_type: 'sell',
        asset: stock,
        transaction_number: @transaction_number
      )
      render json: { success: true, message: 'Stock sold successfully' }
    else
      render json: { success: false, error: result[:error] }, status: :unprocessable_entity
    end
  end


  def show_all_stocks
    stock_transactions = PortfolioTransaction.where(asset_type: 'Stock')
    stocks_info = stock_transactions.map { |transaction| transaction.attributes }
    render json: { stocks: stocks_info }
  end

  def show_user_stocks
    user = User.find(params[:user_id])
    stock_transactions = PortfolioTransaction.where(user_id: user.id, asset_type: 'Stock')
    stocks_info = stock_transactions.map { |transaction| transaction.attributes }
    render json: { user_stocks: stocks_info }
  end

  private
  def update_user_balance_sell(user, total_sale_value)
    if user.nil?
      { success: false, error: 'User not authenticated' }
    else
      user.balance.stocks += total_sale_value
      if user.balance.save
        { success: true, message: 'Stocks balance updated successfully' }
      else
        { success: false, error: 'Failed to update stocks balance' }
      end
    end
  end


  def update_user_balance(amount)
    user = User.find(params[:user_id])

    if user.nil?
      { success: false, error: 'User not authenticated' }
    else
      user.balance.stocks -= amount
      if user.balance.save
        { success: true, message: 'Stocks balance updated successfully' }
      else
        { success: false, error: 'Failed to update stocks balance' }
      end
    end
  end
end
