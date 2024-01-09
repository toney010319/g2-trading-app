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

  resources :transactions, only: [:create, :index]
  resources :admins, only: [:index, :show, :create, :update, :destroy]

  get '/transactions/show', to: 'transactions#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  post 'add_balance', to: 'balances#add_balance'
  get '/balances', to: 'balances#show'
  get '/balance', to: 'balances#index'
  # Defines the root path route ("/")
  # root "posts#index"
end
