class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?
    # C R L L L

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_login
        redirect_to new_session_url unless logged_in?
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        redirect_to new_session_url
        # Missing something here. Redirect?
    end

    def logged_in?
        !!current_user
    end

end
