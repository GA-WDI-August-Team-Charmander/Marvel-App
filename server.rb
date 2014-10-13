require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)
require 'sinatra'
require 'uri'
require_relative './db/connection'
require_relative './lib/models'
require 'active_support'


after do
	ActiveRecord::Base.connection.close
end

def create_hero(hero_name)
	timestamp = Time.now.strftime("%H%M%S%L")
	apikey = "8d20b1ff41cbacbd7ac1f5b68ae8f6e5"
	privatekey = "afba8e7da6c22feb91ed9b3e5d60368bda557fc4"
	digest = Digest::MD5.hexdigest(timestamp + privatekey + apikey)
	name_encoded = URI.encode(hero_name)

	request = HTTParty.get("http://gateway.marvel.com/v1/public/characters?name=#{name_encoded}&ts=#{timestamp}&apikey=#{apikey}&hash=#{digest}")

	name = request["data"]["results"][0]["name"]
	image_url = request["data"]["results"][0]["thumbnail"]["path"] + "." + request["data"]["results"][0]["thumbnail"]["extension"]
	description = request["data"]["results"][0]["description"]
	api_id = request["data"]["results"][0]["id"]

	Character.create({
		name: name, 
		image_url: image_url, 
		description: description, 
		api_id: api_id
	})
end
	
def get_character_comics(hero_name)
	timestamp = Time.now.strftime("%H%M%S%L")
	apikey = "8d20b1ff41cbacbd7ac1f5b68ae8f6e5"
	privatekey = "afba8e7da6c22feb91ed9b3e5d60368bda557fc4"
	digest = Digest::MD5.hexdigest(timestamp + privatekey + apikey)
	character = Character.find_by({name: hero_name})
	character_api_id = character.api_id

	request = HTTParty.get("http://gateway.marvel.com/v1/public/characters/#{character_api_id}/comics?ts=#{timestamp}&apikey=#{apikey}&hash=#{digest}")
	
	comics = request["data"]["results"]

	comics.each do |comic|
		api_id = comic["id"]
		title = comic["title"]
		issue_number = comic["issueNumber"]
		description = comic["description"]
		date_issued = comic["dates"][0]["date"].split("T")[0]
		page_count = comic["pageCount"]
		series = comic["series"]["name"]
		thumbnail = comic["thumbnail"]["path"] + "." + comic["thumbnail"]["extension"]

		Comic.create({
			api_id: api_id, 
			title: title, 
			issue_number: issue_number,
			description: description,
			date_issued: date_issued,
			page_count: page_count,
			series: series,
			thumbnail: thumbnail
		})
	end
end

before do 
	content_type :json
end

get ('/users') do
	User.all.to_json
end

get ('/users/:id') do
	User.find(params[:id])
end

post ('/users') do
	user = User.create(user_params(params))
	user.to_json
end

put ('/users/:id') do 
	user = User.find_by(id: params[:id])
	user.update(user_params(params))
	user.to_json
end

delete ('/users/:id') do
	user = User.find(params[:id])
	user.destroy

	user.to_json
end

get ('/fav_characters') do
	FavCharacter.all.to_json
end

post ('/fav_characters') do
	FavCharacter.create({user_id: params["user_id"], character_id: params["character_id"]})
end

get ('/user_comics') do
	Users_comic.all.to_json
end

post ('/user_comics') do
	if params["bought"] == nil 
		Users_comic.create({user_id: params["user_id"], comic_id: params["comic_id"], read: params["read"]})
	else
		Users_comic.create({user_id: params["user_id"], comic_id: params["comic_id"], bought: params["bought"]})
	end
end

get ('/user_badges') do
	Users_badge.all.to_json
end

post ('/user_badges') do
	Users_badge.create({user_id: params["user_id"], badge_id: params["badge_id"]})
end

# get ('/users/:id/badges') do
# 	user = User.find(params[:id].to_json)
# 	#API CALL
# end 

# get ('/users/:id/comics') do
# 	user = User.find(params[:id].to_json)
# 	#API CALL
# end

# get ('/users/:id/read') do
# 	user = User.find_by(id: params["id"].to_json)
# 	#API CALL
# end

get ('/characters') do
	Character.all.to_json
end

get ('/characters/:id') do
	character = Character.find_by(id: params["id"])
	character.to_json
end

post('/characters') do
	binding
	create_hero(params["name"])
	# user_id = 5
	# FavCharacter.create({user_id: user_id, character_id: new_character_id})	
end

get ('/characters/:api_id/comics') do
	character = Character.find(params[:api_id].to_json)

# API CALL
end

get ('/comics') do
	Comic.all.to_json
end

get ('/comics/:id') do
	comic = Comic.find(params[:id].to_json)
end

post ('/comics') do
	Comic.create(comic_params(params))
end

get ('/badges') do
	Badge.all.to_json
end

get ('/badges/:id') do
	badge = Badge.find(params[:id])
end

def user_params(params)
  params.slice(*User.column_names)
end

def character_params(params)
  params.slice(*Character.column_names)
end

def fav_character_params(params)
  params.slice(*Fav_character.column_names)
end


