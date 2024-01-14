class DatasController < ApplicationController
  def show_stocks
    render json: Stock.all.order(:name)
  end

  def show_crypto
    render json: Cryptocurrency.all.order(:name)
  end

  def show_currency
    render json: Currency.all.order(:name)
  end
end
