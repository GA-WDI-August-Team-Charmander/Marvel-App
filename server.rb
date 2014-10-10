require 'sinatra'
require 'pry'
require_relative './db/connection'
require_relative './lib/model'


after do
	ActiveRecord::Base.connection.close
end

before do 
	content_type :json
end


get('/users') do
	User.all.to_json
end

get('/users/:id') do
	User.find(params[:id].to_json)
end

post ('/users') do
	user = User.create(user_params(params))
	user.to_json
end

put ('/users/:id') do 
	user = User.find(params[:id])
	user.update(user_params(params))

	user.to_json
end

delete ('/users/:id') do
	user = User.find(params[:id])
	user.destroy

	user.to_json
end

get('/characters') do
	Character.all.to_json
end

get ('/characters/:id') do
	Character.find(params[:id].to_json)
end

post('/characters') do
	Character.create(character_params(params))
	characters.to_json
end

get('/users/:id/fav_characters') do
	user = User.find(params[:id].to_json)
	Fav_character.all.to_json
end

get('/users/:id/fav_characters/:id') do 
	Fav_character.find(params[:id]).to_json
end

post('/users/:id/fav_characters') do
	Fav_character.create(fav_character_params(params))
	fav_character.to_json
end

delete('/users/:id/fav_characters/:id') do
	fav_character = Fav_character.find(params[:id])
	fav_character.destory

	fav_character.to_json
end

get ('/characters_comics') do
	character_comics = Character_comic.all.to_json
end

get('/characters_comics/:id') do
	Character_comic.find(params[:id].to_json)
end

post('/characters_comics') do
	Character_comic.create(character_comic_params(params))
	character_comics.to_json
end
