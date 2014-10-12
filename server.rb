require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)
require 'sinatra'
require_relative './db/connection'
require_relative './lib/models'
require 'active_support'


after do
	ActiveRecord::Base.connection.close
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

get ('/users/:id/fav_characters') do
	user = User.find(params[:id])
	binding.pry
#API CALL
end

post ('/users/:id/fav_characters') do
	Fav_character.create(fav_character_params(params))
	fav_character.to_json
end

get ('/users/:id/fav_characters/:id2') do 
	user = User.find(params[:id].to_json)
	fav_character = Fav_character.find(params[:id2]).to_json
end

delete ('/users/:id/fav_characters/:id2') do
	user = User.find(params[:id].to_json)
	fav_character = Fav_character.find(params[:id2])
	fav_character.destory
	fav_character.to_json
end

get ('/users/:id/badges') do
	user = User.find(params[:id].to_json)
	#API CALL
end 

get ('/users/:id/comics') do
	user = User.find(params[:id].to_json)
	#API CALL
end

get ('/users/:id/read') do
	user = User.find(params[:id].to_json)
	#API CALL
end

get ('/characters') do
	Character.all.to_json
end

get ('/characters/:id') do
	Character.find(params[:id].to_json)
end

post('/characters') do
	Character.create(character_params(params))
	characters.to_json

	#API CALL
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
	Badges.all.to_json
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


