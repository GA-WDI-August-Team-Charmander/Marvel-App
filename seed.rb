require 'httparty'
require 'pry'
require_relative './db/connection'
require_relative './lib/models'

def create_hero(hero)
	timestamp = Time.now.strftime("%H%M%S%L")
	apikey = "8d20b1ff41cbacbd7ac1f5b68ae8f6e5"
	privatekey = "afba8e7da6c22feb91ed9b3e5d60368bda557fc4"
	digest = Digest::MD5.hexdigest(timestamp + privatekey + apikey)

	request = HTTParty.get("http://gateway.marvel.com/v1/public/characters?name=#{hero}&ts=#{timestamp}&apikey=#{apikey}&hash=#{digest}")

	name = request["data"]["results"][0]["name"]
	image_url = request["data"]["results"][0]["thumbnail"]["path"] + request["data"]["results"][0]["thumbnail"]["extension"]
	description = request["data"]["results"][0]["description"]

	Character.create({name: name, image_url: image_url, description: description})
end

create_hero("captain%20america")
create_hero("spider-man")
create_hero("black%20widow")
create_hero("elektra")
create_hero("wolverine")
create_hero("hulk")
create_hero("cyclops")
create_hero("thor")
create_hero("iron%20man")
create_hero("jean%20grey")
