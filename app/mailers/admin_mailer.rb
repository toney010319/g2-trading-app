class AdminMailer < Devise::Mailer   
    default from: 'adminstellarmarkets.com'
  
    def account_approved_email(user)
      @user = user
      mail(to: @user.email, subject: 'Your account has been approved')
    end
  end