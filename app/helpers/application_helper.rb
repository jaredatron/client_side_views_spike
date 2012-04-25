module ApplicationHelper

  attr_accessor :page_state

  def page_layout
    @page_layout ||= 'application'
  end

  def page_name
    @page_name ||= "#{params[:controller]}/#{params[:action]}"
  end

  def page_title page_title=nil
    @page_title = page_title unless page_title.nil?
    @page_title || Rails.application.to_s
  end

end
