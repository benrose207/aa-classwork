class ArtworksController < ApplicationController
    def index
        user = User.includes(:artworks, :shared_artworks).find(params[:user_id])
        owned_artwork = user.artworks
        shared_with = user.shared_artworks
        artworks = owned_artwork + shared_with

        render json: artworks
    end

    def show
        artwork = Artwork.find(params[:id])
        render json: artwork
    end

    def create
        artwork = Artwork.new(helper_params)
        if artwork.save
            render json: artwork
        else
            render json: artwork.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def destroy
        artwork = Artwork.find(params[:id])
        artwork.destroy
        render json: artwork
    end

    def update
        artwork = Artwork.find(params[:id])
        if artwork.update(helper_params)
            render json: artwork
        else
            render json: artwork.errors.full_messages, status: :unprocessable_entity
        end
    end

    private
    def helper_params
        params.require(:artwork).permit(:image_url, :title, :artist_id)
    end
end