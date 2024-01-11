class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  private
  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :birthday, :first_name, :role, :middle_name, :last_name, :role)
  end
  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        status: {code: 200, message: "You will recieve an email to confirm your email address in a few minutes."},
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
        status: { code: 200, message: "Account deleted successfully."}
      }, status: :ok
    else
      render json: {
        status: {code: 422, message: " #{resource.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
