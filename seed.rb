require 'httparty'
require 'pry'
require 'uri'
require_relative './db/connection'
require_relative './lib/models'

Character.delete_all
Comic.delete_all
Badge.delete_all

user = User.create(name: "Joe")

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

create_hero("captain america")
create_hero("spider-man")
create_hero("black widow")
create_hero("wolverine")
create_hero("hulk")
create_hero("cyclops")
create_hero("thor")
create_hero("iron man")
create_hero("jean grey")

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

get_character_comics("Spider-Man")

Badge.create({name: "Avid Reader - 1", badge_src: "./img/badge_avidreader.png"});
Badge.create({name: "Avid Reader - 5", badge_src: "./img/badge_avidreader2.png"});
Badge.create({name: "Avid Reader - 10", badge_src: "./img/badge_avidreader3.png"});
Badge.create({name: "Avid Reader - 20"});
Badge.create({name: "Avid Reader - 50"});
Badge.create({name: "Avid Reader - 100"});

# when they read 5 or more from one age:
Badge.create({name: "Badge of the Ages - Golden Age of Comics: 1938-1950", badge_src: "./img/badge_age_gold.png"});
Badge.create({name: "Badge of the Ages - Silver Age of Comics: 1951-1970", badge_src: "./img/badge_age_silver.png"});
Badge.create({name: "Badge of the Ages - Bronze Age of Comics: 1971-1985"});
Badge.create({name: "Badge of the Ages - Modern Age of Comics: 1986-Now"});

Badge.create({name: "Character Fan", badge_src: "./img/badge_characterfan.png"});










