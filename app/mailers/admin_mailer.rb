class AdminMailer < Devise::Mailer
    default from: 'admin@stellarmarkets.com'

    def account_approved_email(user)
      @user = user
      mail(to: @user.email, subject: 'Your account has been approved')
    end

    def account_disapproved_email(user, message)
      @user = user
      @message = message
      mail(to: @user.email, subject: 'Account Disapproval Notice')
    end
  end
