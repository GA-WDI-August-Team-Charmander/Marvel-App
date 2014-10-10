
//~<*{{ MODEL }}*>~ --------------------------------

var User_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New user initialised!");
	},

	urlRoot: '/users'
});

var Character_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New character initialised!");
	},

	urlRoot: '/characters'
});

var Comic_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New comic initialised!");
	},

	urlRoot: '/comics'
});

var Badge_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Badge initialised!");
	},

	urlRoot: '/badges'
});

var FavCharacter_Model = Backbone.Model.extend({
	url: '/users/' + id + "/fav_characters",

	initialize: function(){
		console.log("New Fav_character initialised!");
	},

	urlRoot: '/fav_characters'
});

var CharactersComic_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Characters_comic initialised!");
	},

	urlRoot: '/characters_comics'
});

var UsersComic_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Users_comic initialised!");
	},

	urlRoot: '/users_comics'
});

var UsersBadge_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New users_badge initialised!");
	},

	urlRoot: '/users_badges'

});


//~<*{{ COLLECTION }}*>~ --------------------------------

var User_Collection  = Backbone.Collection.extend({	
	model: User_Model,
	url: '/users'
});
var user_collection = new UserCollection

var Comic_Collection = Backbone.Collection.extend({
	model: Comic_Model,
	url: '/comics'
});


var Character_Collection = Backbone.Collection.extend({
	model: Character_Model,
	url: '/characters'
});
//chars

var Badge_Collection = Backbone.Collection.extend({
	model: Badge_Model,
	url: '/badges'
});
//badge

var FavCharacter_Collection = Backbone.Collection.extend({
	model: FavCharacter_Model,
	//url:  //?????????????
	//url: function(){
	//	return 
	//}
});
var favCharacter_collection = new FavCharacter_Collection();
//favChars

var UsersBadge_Collection = Backbone.Collection.extend({
	model: UsersBadge_Model,
	//url: '/users/' + id + "/badges"
});

// var CharactersComic_Collection  = Backbone.Collection.extend({
// 	model: CharactersComic_Model,
// 	url: '/'
// });


var Task_Collection = Backbone.Collection.extend({
	model: UsersComic_Model,
	url: '/users/' + user_id + "/com"
});
//toReadComics, ReadComics, toBuyComics, boughtComics



var toBuyComics;
var boughtComics;
var toReadComics;
var readComics;
var badges;
var favChars;


