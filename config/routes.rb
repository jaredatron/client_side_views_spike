ClientSideViewsExample::Application.routes.draw do
  resource :session
  resources :users
  resources :petitions do
    resources :comments
    resources :updates
  end
  root :to => redirect("/petitions")
end
