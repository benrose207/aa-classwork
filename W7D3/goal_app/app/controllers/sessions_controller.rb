class SessionsController < ApplicationController

    def new
        render :new
    end

    def create

        @user = User.find_by_credentials(
                params[:user][:username],
                params[:user][:password]
                )
        
        if @user 
            login(@user)
            redirect_to users_url
        else
            flash.now[:errors] = ['invalid credentials, try again']
            render :new
        end
    end




end
