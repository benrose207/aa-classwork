class LikesController < ApplicationController
    def index
        if params[:comment_id]
            comment = Comment.includes(:likes).find(params[:comment_id])
            likes = comment.likes
        elsif params[:artwork_id]
            artwork = Artwork.includes(:likes).find(params[:artwork_id])
            likes = artwork.likes
        else
            user = User.includes(:likes).find(params[:user_id])
            likes = user.likes
        end
        render json: likes
    end


    def create
        like = Like.new(like_params)
        if like.save
            render json: like
        else
            render json: like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        render json: like
    end

    private

    def like_params
        params.require(:like).permit(:liker_id, :likeable_id, :likeable_type)
    end
end
