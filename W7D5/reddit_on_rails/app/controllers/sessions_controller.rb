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
            login!(@user)
            redirect_to subs_url
        else
            flash.now[:errors] = ["Issue with login credentials, please try again"]
            render :new
        end
    end

    def destroy
        logout!
        render :new
    end
end
