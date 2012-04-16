class PostsController < ApplicationController

  def index
    render :text => 'posts index', :layout => true
  end

end
