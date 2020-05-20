class AlbumsController < ApplicationController

    def show
        @album = Album.find_by(id: params[:id])
        render :show
    end

    def new
        @album = Album.new(band_id: params[:band_id])
        @bands = Band.all
        render :new
    end

    def create
        @album = Album.new(album_params)
        
        if @album.save
            redirect_to album_url(@album)
        else
            flash.now[:errors] = @album.errors.full_messages
        end
    end

    def edit
        @album = Album.find_by(id: params[:id])
        @bands = Band.all
        render :edit
    end

    def update
        @album = Album.find_by(id: params[:id])

        if @album.update(album_params)
            redirect_to album_url(@album)
        else
            flash.now[:errors] = @album.errors.full_messages
        end
    end

    def destroy
        @album = Album.find_by(id: params[:id])
        @album.destroy
        redirect_to band_url(@album.band_id)
    end

    private

    def album_params
        params.require(:album).permit(:title, :year, :live, :band_id)
    end
end
