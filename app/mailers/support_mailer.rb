class SupportMailer < Devise::Mailer

default to: 'admin@stellarmarkets.com'

  def contact_support_email(user, message,subject)
    @user = user
    @message = message
    @subject = subject
    mail(from: @user.email, subject: @subject )
  end
end
