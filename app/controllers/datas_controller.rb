class DatasController < ApplicationController
    def show_stocks
      render json: Stock.all
    end
  
    def show_crypto
      render json: Cryptocurrency.all
    end

    def show_currency
        render json: Currency.all
      end
  end