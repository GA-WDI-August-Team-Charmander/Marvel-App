
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
	url: '/users',

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
var users = new User_Collection()

var Comic_Collection = Backbone.Collection.extend({
	model: Comic_Model,
	url: '/comics'
});
// comics

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
	url: '/users'
});
var favCharacter_collection = new FavCharacter_Collection();
favCharacter_collection.fetch()
favCharacter_collection.models


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
	url: '/users'
});
//toReadComics, ReadComics, toBuyComics, boughtComics



var toBuyComics;
var boughtComics;
var toReadComics;
var readComics;
var badges;
var favChars;




//~<*{{ VIEWS }}*>~ --------------------------------


var Fav_View = Backbone.View.extend({
	tagName: "li",

});

var List_View = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'add', this.addOne);
		this.collection.fetch();
	},

	addOne: function(fav_view){
		var fav_view = new Fav_View({model: fav_view});
		fav_view.render();
		this.$el.append(fav_view);
	}
});


























