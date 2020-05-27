class PostsController < ApplicationController

    before_action :require_login, except: :show
    before_action :require_post_author, only: [:edit, :update, :destroy]

    def show
        @post = Post.find_by(id: params[:id])
        @all_comments = @post.comments
        render :show
    end

    def new
        @post = Post.new
        render :new
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            redirect_to post_url(@post)
        else
            flash[:errors] = @post.errors.full_messages
            render :new
        end
    end

    def edit
        @post = Post.find_by(id: params[:id])
        render :edit
    end
    
    def update
        @post = Post.find_by(id: params[:id])
    
        if @post.update(post_params)
            redirect_to post_url(@post)
        else
            flash.now[:errors] = @post.errors.full_messages
            render :edit
        end
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        @post.destroy

        redirect_to sub_url(@post.sub_id)
    end

    private

    def require_post_author
        @post = Post.find(:id)
        redirect_to sub_url(@post.sub_id) unless @post.author_id == current_user.id
    end

    def post_params
        params.require(:post).permit(:title, :url, :content, sub_ids: [])
    end
end
