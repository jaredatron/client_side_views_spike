module ApplicationHelper

  def javascript_env
    @javascript_env ||= begin
      env = {
        "logged_in" => false,
      }

      env.merge!({
        "session" => session
      }) if Rails.env.development?

      env
    end
  end

  def layout
    @layout || 'application'
  end

  def page
    @page || "#{params[:controller]}/#{params[:action]}"
  end

  def render_options
    @render_options ||= {}
  end

  def page_title
    @page_title || Rails.app.to_s
  end

end
