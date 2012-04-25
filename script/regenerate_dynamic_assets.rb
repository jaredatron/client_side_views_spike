#!/usr/bin/env ruby

# this script is here because the rails asset pipeline doesn't have a way
# to tell rails to recompile assets files that user erb to suck in other files
# when those files change

dynamic_assets = %w{
  javascripts/views.js.erb
  stylesheets/application.sass.erb
}

loop do
  dynamic_assets.each{|asset|
    asset = Rails.root.join("app/assets/#{asset}")
    content = asset.read.gsub(/UPDATE\(\d+\)/, "UPDATE(#{Time.now.to_i})")
    asset.open('w'){|f| f.write(content) }
  }
  sleep 1
end
