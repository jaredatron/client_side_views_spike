class ApplicationController < ActionController::Base
  protect_from_forgery

  def page_state
    @page_state ||= {
      :logged_in => !!session[:logged_in],
    }
  end

end
