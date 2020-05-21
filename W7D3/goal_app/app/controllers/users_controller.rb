class UsersController < ApplicationController
        def index
            @users = User.all
        end

        def show
            @user = User.find(params[:id])
        end

        def new
            @user = User.new
        end

        def edit
            @user = User.find(params[:id])
        end

        def create
            @user = User.new(user_params)

            if @user.save
                # login(@user)
                redirect_to user_url(@user)
            else
                flash.now[:errors] = @user.errors.full_messages
                render :new
            end
        end

        def update
            @user = User.find(params[:id])

            if @user.update(user_params)
                redirect_to user_url(@user)
            else
                flash.now[:errors] = @user.errors.full_messages
                render :edit
            end
        end

        def destroy
            user = User.find(params[:id])
            user.destroy
            redirect_to new_user_url
        end

        private

        def user_params
            params.require(:user).permit(:username, :password)
        end

end
