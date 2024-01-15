class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_many :transactions, dependent: :destroy
  has_many :stocks, dependent: :destroy
  has_many :portfolio_transactions
  has_one :balance, dependent: :destroy
  has_many :stocks, through: :portfolio_transactions, source: :asset, source_type: 'Stock', class_name: 'Stock', dependent: :destroy
  has_many :cryptos, through: :portfolio_transactions, source: :asset, source_type: 'Crypto', class_name: 'Cryptocurrency',dependent: :destroy
  has_many :forex, through: :portfolio_transactions, source: :asset, source_type: 'Forex',  class_name: 'Currency',dependent: :destroy
  accepts_nested_attributes_for :balance, allow_destroy: true
  after_create :create_balance

  devise :database_authenticatable, :registerable, :validatable, :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: self

         def jwt_payload
          super
        end

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :birthday, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :middle_name, presence: true
  validates :password, presence: true, on: :create
  validate :at_least_18

  def admin?
    role == 'Admin'
  end
  def approve!
    self.update!(email_confirmed: true, status: "active")
    AdminMailer.account_approved_email(self).deliver_now
  end

  def disapprove!
    update(status: 'pending')
  end
  def create_balance
    self.balance = Balance.new(balance: 0, stocks: 0, forex: 0, crypto: 0)
  end

  private
         def at_least_18
           if birthday.present? && birthday > 18.years.ago
             errors.add(:base, 'You must be 18 years old or above.')
           end
         end
end
