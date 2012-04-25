class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user_session
    @current_user_session ||= UserSession.find
  end
  helper_method :current_user_session

  def current_user
    @current_user ||= current_user_session && current_user_session.record
  end
  helper_method :current_user

  def page_data
    @page_data ||= {
      :current_user => current_user
    }
  end
  helper_method :page_data

  def render_json
    formats, view_context.formats = view_context.formats, [:json]
    render_to_string
  rescue ActionView::MissingTemplate
    return '{}'
  ensure
    view_context.formats = formats
  end
  helper_method :render_json

end
