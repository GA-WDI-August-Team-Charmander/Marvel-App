
//~<*{{ User }}*>~ --------------------------------

var User_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New user initialised!");
	},

	urlRoot: '/users'
});

var User_Collection  = Backbone.Collection.extend({	
	model: User_Model,
	url: '/users'
});

var user_list_view = new List_View( {collection: User_Collection} );






var Item_View = Backbone.View.extend({
	tagName: "li",



	initialize: function(){
		this.listenTo(this.model, "remove", this.remove);
	},
	render: function(){
		this.$el.html("<p>" + this.model.get('name') + "</p>");
	}

});

var List_View = Backbone.View.extend({
	tagName: "ul",

	initialize: function(){
		this.listenTo(this.collection, 'add', this.addOne);
		this.collection.fetch();
	},

	addOne: function(item_view){
		var item_view = new Item_view({model: item_view});
		item_view.render();
		this.$el.append(item_view);
	}
});

function generatePage(){
	$('#users').append(user_list_view)
}

generatePage();





//badge



// var Character_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New character initialised!");
// 	},

// 	urlRoot: '/characters'
// });

// var Comic_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New comic initialised!");
// 	},


// 	urlRoot: '/comics'
// });

//toReadComics, ReadComics, toBuyComics, boughtComics


// var Badge_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New Badge initialised!");
// 	},

// 	urlRoot: '/badges'
// });

// var FavCharacter_Model = Backbone.Model.extend({
// 	url: '/users/' + id + "/fav_characters",

// 	initialize: function(){
// 		console.log("New Fav_character initialised!");
// 	},

// 	urlRoot: '/fav_characters'
// });

// var CharactersComic_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New Characters_comic initialised!");
// 	},

// 	urlRoot: '/characters_comics'
// });

//~<*{{ VIEWS }}*>~ --------------------------------

// var UsersComic_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New Users_comic initialised!");
// 	},

// 	urlRoot: '/users_comics'
// });

// var UsersBadge_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New users_badge initialised!");
// 	},

// 	urlRoot: '/users_badges'

// });


// //~<*{{ COLLECTION }}*>~ --------------------------------


// var user_collection = new UserCollection

// var Comic_Collection = Backbone.Collection.extend({
// 	model: Comic_Model,
// 	url: '/comics'
// });


// var Character_Collection = Backbone.Collection.extend({
// 	model: Character_Model,
// 	url: '/characters'
// });
// //chars

// var Badge_Collection = Backbone.Collection.extend({
// 	model: Badge_Model,
// 	url: '/badges'
// });
// //badge

// var FavCharacter_Collection = Backbone.Collection.extend({
// 	model: FavCharacter_Model,
// 	//url:  //?????????????
// 	//url: function(){
// 	//	return 
// 	//}
// });
// var favCharacter_collection = new FavCharacter_Collection();
// //favChars

// var UsersBadge_Collection = Backbone.Collection.extend({
// 	model: UsersBadge_Model,
// 	//url: '/users/' + id + "/badges"
// });

// // var CharactersComic_Collection  = Backbone.Collection.extend({
// // 	model: CharactersComic_Model,
// // 	url: '/'
// // });


// var Task_Collection = Backbone.Collection.extend({
// 	model: UsersComic_Model,
// 	url: '/users/' + user_id + "/com"
// });
// //toReadComics, ReadComics, toBuyComics, boughtComics



// var toBuyComics;
// var boughtComics;
// var toReadComics;
// var readComics;
// var badges;
// var favChars;




//~<*{{ VIEW }}*>~ --------------------------------























