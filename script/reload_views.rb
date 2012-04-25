#!/usr/bin/env ruby
# This command will automatically be run when you run "rails" with Rails 3 gems installed from the root of your application.

APP_PATH = File.expand_path('../../config/application',  __FILE__)
require File.expand_path('../../config/boot',  __FILE__)

views = Rails.root.join('app/assets/javascripts/views.js.erb')

loop do
  content = views.read.sub(/UPDATE\(\d+\)/, Time.now.to_i)
  views.open('w'){|f| f.write('content') }
  print '.'
  sleep 1
end
