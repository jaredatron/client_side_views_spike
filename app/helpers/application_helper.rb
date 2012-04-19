module ApplicationHelper

  def page_state
    @page_state ||= {
      :layout => 'application',
      :page   => "#{params[:controller]}/#{params[:action]}"
    }
  end

  def page_title
    @page_title || Rails.app.to_s
  end

end
