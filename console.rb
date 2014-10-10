require 'httparty'
require 'pry'
require_relative './db/connection'
require_relative './lib/models'

timestamp = Time.now.strftime("%H%M%S%L")
apikey = "8d20b1ff41cbacbd7ac1f5b68ae8f6e5"
privatekey = "afba8e7da6c22feb91ed9b3e5d60368bda557fc4"
digest = Digest::MD5.hexdigest(timestamp + privatekey + apikey)
request = HTTParty.get("http://gateway.marvel.com/v1/public/comics?ts=#{timestamp}&apikey=#{apikey}&hash=#{digest}")

binding.pry
