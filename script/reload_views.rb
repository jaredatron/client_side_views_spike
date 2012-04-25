#!/usr/bin/env ruby

views = Rails.root.join('app/assets/javascripts/views.js.erb')

loop do
  content = views.read.gsub(/UPDATE\(\d+\)/, "UPDATE(#{Time.now.to_i})")
  views.open('w'){|f| f.write(content) }
  print '.'
  sleep 1
end
