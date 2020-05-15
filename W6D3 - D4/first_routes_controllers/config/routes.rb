Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:create, :destroy, :update, :index, :show] do
    resources :artworks, only: [:index]
    resources :comments, only: [:index]
    resources :likes, only: [:index]
  end


  resources :artworks, only: [:create, :destroy, :update, :show] do
    resources :comments, only: [:index]
    resources :likes, only: [:index]

    member do 
      patch 'favorite'
    end
 #   /artworks/13/favorite
  end

  resources :artwork_shares, only: [:create, :destroy]

  resources :comments, only: [:create, :destroy] do 
    resources :likes, only: [:index]
  end

  resources :likes, only: [:create, :destroy]

  # get 'users/:id', to: 'users#show', as: 'user'
  # get '/users', to: 'users#index', as: 'users'
  # get '/users/new', to: 'users#new', as: 'new_user'
  # get '/users/:id/edit', to: 'users#edit', as: 'edit_user'
  # patch '/users/:id', to: 'users#update'
  # delete '/users/:id', to: 'users#destroy'
  # post '/users', to: 'users#create'
  # put '/users/:id', to: 'users#update'
end
