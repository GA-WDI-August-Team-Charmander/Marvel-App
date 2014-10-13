
Avid_reader_badge
--> a badge based on how many toRead items he has read

PROCESS:

for user 1
var usersComicCollection = usersComic.where({user_id: 1})
var readNumber = usersComicCollection.where({read: true}).length

if(readNumber==1){
	avid_reader_1.render()
} else if (readNumber==3){
	avid_reader_3.render()
} else if (readNumber==7){
	avid_reader_7.render()
}

BADGES: 
// Avid Reader 1
// Avid Reader 3
// Avid Reader 7
// Avid reader 10
// Avid reader 20
// Avid reader 50
// Avid reader 100


Age of Comics badges
var usersComicCollection = usersComic.where({user_id: 1})
var usersReadCollection = usersReadCollection.where({read: true})
var count_goldenAge = 0;
var count_silverAge = 0;
var count_bronzeAge = 0;
var count_modernAge = 0;
_.each(usersReadCollection, function(comic){
	if(comic['date_issued'].split('-')[0] > 1985){
		count_modernAge += 1;
	} else if(comic['date_issued'].split('-')[0] > 1970) {
		count_bronzeAge += 1;
	} else if(comic['date_issued'].split('-')[0] > 1950) {
		count_silverAge += 1;
	} else if(comic['date_issued'].split('-')[0] > 1937) {
		count_goldenAge += 1;
	}
});

if(count_goldenAge >= 5){
	badge_goldenAge.create();
}
if(count_silverAge >= 5){
	badge_silverAge.create();
}
if(count_bronzeAge >= 5){
	badge_bronzeAge.create();
}
if(count_modernAge >= 5){
	badge_modernAge.create();
}

Golden Age of Comics reader badge 
1938-1950

Silver Age of Comics reader badge
1951-1970


Bronze Age of Comics reader badge
1971-1985

Modern Age of Comics reader badge
1986-now




Reading a comic with his fav character in it badge

task_flow:
//user reads comic
users_comic['read'] -> true, do the follwoing
var this_comic_id = users_comic['comic_id']
var this_user_id = 1

//get all userComics and favCharcters belonging to user with id: 1
var user_comic_array = usersComic_collection.where({user_id: 1}) //filter
var fav_character_array = favCharacter_collection.where({user_id: 1})

var badge = false;

_.each(fav_character_array, function(item){
	var this_marvel_char = character_collection.findWhere( { id: item['char_id'] } );
	var this_marvel_comic = comic_collection.findWhere( {id: this_comic_id});
	_.each(charactersComic_collection, function(charComic){
		if (charComic['comic_id'] == this_marvel_comic['id'] && charComic['character_id'] == this_marvel_char['id']){
			badge = true;
			badge.render
			return
		}

	}
});


//if comic contains favourite character, get badge







