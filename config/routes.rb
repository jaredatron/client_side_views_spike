ClientSideViewsExample::Application.routes.draw do
  resources :users
  resources :petitions do
    resources :comments
    resources :updates
  end

  post '/login',  :to => 'user_sessions#create'
  post '/logout', :to => 'user_sessions#destroy'

  root :to => redirect("/petitions")
end
