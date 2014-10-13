
function badgeCheck(){
	badgeCheck_avidReader();
	badgeCheck_badgeOfTheAges();

	// badgeCheck_characterFan(comic, user);
}

function badgeCheck_avidReader(){
	// ~<*{{ initial variables }}*>~
	var this_user_id = 5;
	var this_user_comicCollection = userComicCollection.where({user_id: this_user_id});
	var readQty = this_user_comicCollection.where({read: true}).length;

	// ~<*{{ give badges }}*>~
	if(readQty == 1){
		//Badge.destroy( {});
		//Badge.create( {name: "avid_reader_1"} );
	} else if (readQty == 5){
		//Badge.create( {name: 'avid_reader_5'} );
	} else if (readQty == 10){
		//Badge.create( {name: 'avid_reader_10'} );
	} else if (readQty == 20){
		//Badge.create( {name: 'avid_reader_20'} );
	} else if (readQty == 50){
		//Badge.create( {name: 'avid_reader_50'} );
	} else if (readQty == 100){
		//Badge.create( {name: 'avid_reader_100'} );
	}
}



function badgeCheck_badgeOfTheAges(){
	// ~<*{{ initial variables }}*>~
	var this_user_id = 5;
	var this_user_comicCollection = userComicCollection.where({user_id: this_user_id});
	var comicsReadByUser = this_user_comicCollection.where({read: true});

	// ~<*{{ set counts }}*>~
	var count_goldenAge = 0;
	var count_silverAge = 0;
	var count_bronzeAge = 0;
	var count_modernAge = 0;

	// ~<*{{ increment counts based on date published }}*>~
	_.each(comicsReadByUser, function(comic){
		var yearValue_unparsed = comic['date_issued'].split('-')[0]
		var yearValue = parseInt( yearValue_unparsed );

		if(yearValue > 1985){
			count_modernAge += 1;
		} else if(yearValue > 1970) {
			count_bronzeAge += 1;
		} else if(yearValue > 1950) {
			count_silverAge += 1;
		} else if(yearValue > 1937) {
			count_goldenAge += 1;
		}
	});

	// ~<*{{ give badge based on age }}*>~
	// separate if statemetns because they are not mutually exclusive
	if(count_goldenAge >= 5){
		// badge_goldenAge.create();
	}
	if(count_silverAge >= 5){
		// badge_silverAge.create();
	}
	if(count_bronzeAge >= 5){
		// badge_bronzeAge.create();
	}
	if(count_modernAge >= 5){
		// badge_modernAge.create();
	}

}


function badgeCheck_characterFan(comic, user){
	// ~<*{{ initial variables }}*>~
	var this_comic_id = comic['comic_id'];
	var this_user_id = user['id'];

	// ~<*{{ get all of thisUser's userComics and favCharacters }}*>~
	var this_user_comic_array = userComicCollection.where({user_id: this_user_id});
	var fav_character_array = favCharacter_collection.where({user_id: 1});

	// set count
	// var badge = false;

	// check criteria
	_.each(fav_character_array, function(fav_character){
		var this_marvel_char = character_collection.findWhere( { id: fav_character['char_id'] } ); //find this char
		var this_marvel_comic = comic_collection.findWhere( {id: this_comic_id}); //find this comic
		_.each(charactersComic_collection, function(charComic){
			if (charComic['comic_id'] == this_marvel_comic['id'] && charComic['character_id'] == this_marvel_char['id']){
				// badge = true;

				//render badge();
				return
			}

		}
	});

}








