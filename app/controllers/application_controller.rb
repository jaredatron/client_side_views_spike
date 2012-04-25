class ApplicationController < ActionController::Base
  protect_from_forgery

  def page_data
    @page_data ||= {
      :logged_in => !!session[:logged_in],
    }
  end
  helper_method :page_data

  def render_json
    formats, view_context.formats = view_context.formats, [:json]
    render_to_string
  ensure
    view_context.formats = formats
  end
  helper_method :render_json

end
