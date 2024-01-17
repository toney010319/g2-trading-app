class CryptoTransactionsController < ApplicationController
  before_action :authenticate_user!
  def buy
    user = User.find(params[:user_id])
    quantity = params[:quantity]
    price = params[:price]
    symbol = params[:symbol]
    @transaction_number = rand(100_000..999_999).to_s
    total_cost = quantity.to_i * price.to_f

    crypto = Cryptocurrency.find_by(symbol: symbol)
    unless crypto.present?
      render json: { success: false, message: 'Invalid crypto symbol' }
      return
    end

    result = update_user_balance(total_cost)

    if result[:success]
      transaction = PortfolioTransaction.create!(
        user_id: user.id,
        quantity: quantity.to_i,
        price: price.to_f,
        symbol: symbol,
        transaction_type: 'buy',
        asset: crypto,
        transaction_number: @transaction_number
              )
      render json: { success: true, message: 'Crypto purchased successfully' }
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

    crypto = Cryptocurrency.find_by(symbol: symbol)
    unless crypto.present?
      render json: { success: false, message: 'Invalid crypto symbol' }
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
        asset: crypto,
        transaction_number: @transaction_number
      )
      render json: { success: true, message: 'Crypto sold successfully' }
    else
      render json: { success: false, error: result[:error] }, status: :unprocessable_entity
    end
  end


  def show_all_crypto
  crypto_transactions = PortfolioTransaction.where(asset_type: 'Cryptocurrency')
  crypto_info = crypto_transactions.map { |transaction| transaction.attributes }

  render json: { crypto: crypto_info }
  end

  def show_user_crypto
    user = User.find(params[:user_id])
    crypto_transactions = PortfolioTransaction.where(user_id: user.id, asset_type: 'Cryptocurrency')
    crypto_info = crypto_transactions.map { |transaction| transaction.attributes }

    render json: { user_crypto: crypto_info }
  end


private
  def update_user_balance_sell(user, total_sale_value)
    if user.nil?
      { success: false, error: 'User not authenticated' }
    else
      user.balance.crypto += total_sale_value
      if user.balance.save
        { success: true, message: 'Crypto balance updated successfully' }
      else
        { success: false, error: 'Failed to update crypto balance' }
      end
    end
  end

  def update_user_balance(amount)
    user = User.find(params[:user_id])

    if user.nil?
      { success: false, error: 'User not authenticated' }
    else
      user.balance.crypto -= amount
      if user.balance.save
        { success: true, message: 'Crypto balance updated successfully' }
      else
        { success: false, error: 'Failed to update crypto balance' }
      end
    end
  end
end
