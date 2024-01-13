Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get '/users', to: 'users#show'
  resources :transactions, only: [:create, :index]
  resources :admins, only: [:index, :show, :create, :update, :destroy]
  post 'user/:id/approve', to: 'admins#approve'
  post 'user/:id/disapprove', to: 'admins#disapprove'
  get '/transactions/show', to: 'transactions#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  post 'add_balance', to: 'balances#add_balance'
  post 'revert_balance', to: 'balances#revert_balance'

  post 'add_crypto_balance', to: 'balances#add_crypto_balance'
  post 'revert_crypto_balance', to: 'balances#revert_crypto_balance'

  post 'add_forex_balance', to: 'balances#add_forex_balance'
  post  'revert_forex_balance', to: 'balances#revert_forex_balance'

  post 'add_stock_balance', to: 'balances#add_stock_balance'
  post 'revert_stock_balance', to: 'balances#revert_stock_balance'

  get 'balances', to: 'balances#show'
  get 'balance', to: 'balances#index'

  get 'crypto_list', to: 'datas#show_crypto'
  get 'stocks_list', to: 'datas#show_stocks'
  get 'currency_list', to: 'datas#show_currency'

  post 'buy_stocks', to: 'stock_transactions#buy'
  post 'buy_crypto', to: 'crypto_transactions#buy'
  post 'buy_forex', to: 'forex_transactions#buy'

  get 'show_all_assets', to: 'transactions#show_all_assets'
  get  'show_all_user_assets', to: 'transactions#show_all_user_assets'

  get 'show_all_portfolio_stocks', to: 'stock_transactions#show_all_stocks'
  get 'show_all_portfolio_crypto', to: 'crypto_transactions#show_all_crypto'
  get 'show_all_portfolio_forex', to: 'forex_transactions#show_all_forex'
  get 'show_user_stocks', to:'stock_transactions#show_user_stocks'
  get 'show_user_crypto', to:'crypto_transactions#show_user_crypto'
  get 'show_user_forex', to:'forex_transactions#show_user_forex'

  # Defines the root path route ("/")
  # root "posts#index"
end
