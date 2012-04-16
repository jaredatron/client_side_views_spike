class PostsController < ApplicationController

  def index
    respond_to do |format|
      format.html{
        # these would be the defaults
        @render_options = {
          :layout => 'application',
          :view   => "#{params[:controller]}/#{params[:action]}",
        }
        @page_title = 'Post Index Payge';
        render :text => 'posts index', :layout => true
      }
      format.json {
        render :json => {
          :posts => [
            {
              :title => 'My First Post!',
              :body  => 'Hey guys, welcome to my new blog.'
            },
            {
              :title => 'Javascript Rocks!',
              :body  => 'This is going to be an awesome way to make web sites.'
            }
          ]
        }
      }
    end

  end

end
