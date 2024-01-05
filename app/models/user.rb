class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable,
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
  validates :password, presence: true
  validate :at_least_18
         
  private
       
         def at_least_18
           if birthday.present? && birthday > 18.years.ago
             errors.add(:base, 'You must be 18 years old or above.')
           end
         end
end