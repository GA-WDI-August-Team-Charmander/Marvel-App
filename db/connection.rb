require 'active_record'

ActiveRecord::Base.establish_connection({
  :adapter => "postgresql",
  :host => "",
  :username => "root",
  :database => "marvel_app"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)