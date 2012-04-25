ClientSideViewsExample::Application.routes.draw do
  resources :users
  resource :user_session, :only => [:create,:destroy]
  resources :petitions do
    resources :comments
    resources :updates
  end
  root :to => redirect("/petitions")
end
