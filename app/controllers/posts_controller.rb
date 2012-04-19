class PostsController < ApplicationController

  def index
    page_state.merge!(
      :posts => [
        {
          :title => 'My First Post!',
          :body  => 'Hey guys, welcome to my new blog.'
        },
        {
          :title => 'Javascript Rocks!',
          :body  => 'This is going to be an awesome way to make web sites.'
        },
        # {
        #   :title => 'ZOMG THIS IS WESOME',
        #   :body  => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        #   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        #   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        #   consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        #   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        #   proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        # },
      ]
    )

    respond_to do |format|
      format.html{
        @page_title = 'Posts'
        render :nothing => true, :layout => true
      }
      format.json {
        render :json => page_state
      }
    end
  end

end
