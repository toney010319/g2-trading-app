class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :email, :password, :birthday, :first_name, :role, :middle_name, :last_name, :created_at

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%d/%m/%Y')
    
  end
end
