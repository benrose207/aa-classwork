class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create
        user = User.new(helper_params)
        if user.save
            render json: user
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def destroy
        user = User.find(params[:id])
        user.destroy
        render json: user
    end

    def update
        user = User.find(params[:id])
        if user.update(helper_params)
            render json: user
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end
    def helper_params
        params.require(:user).permit(:name, :email)
    end
end