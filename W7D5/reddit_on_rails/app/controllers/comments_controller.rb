class CommentsController < ApplicationController

    before_action :require_login, except: [:show]

    def show
        @comment = Comment.find_by(id: params[:id])
        render :show
    end

    def new
        @comment = Comment.new
        render :new
    end

    def create
        debugger
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        @comment.post_id ||= @comment.parent_comment.post_id

        if @comment.save
            redirect_to post_url(@comment.post_id)
        else
            flash.now[:errors] = @comment.errors.full_messages
            render :new
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :post_id, :parent_comment_id)
    end
    
end