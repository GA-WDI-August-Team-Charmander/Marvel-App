

function addUserButton(){
	$('#add_user_button').on('click', function(){
		$.post('/users', { name: $('add_user_input').val() } );
	});
	console.log("#add_user button and input now listening!");
}







//~<*{{ User }}*>~ --------------------------------

var User_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New user initialised!");
	},
	urlRoot: '/users'
});

var User_Collection  = Backbone.Collection.extend({	
	model: User_Model, // do we need to do an addOne-like thing?
	url: '/users'
});

var user_collection = new User_Collection();

// var user_list_view = new List_View( {collection: user_collection} );
//this might be used for if there is a select for which user profile we're on or logged in





//~<*{{ Comic }}*>~ --------------------------------

var Comic_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New comic initialised!");
	},
	urlRoot: '/comics'
});

var Comic_Collection = Backbone.Model.extend({
	model: Comic_Model,
	url: '/comics'
});

var comic_collection = new Comic_Collection();

// NO COMIC_LIST_VIEW because we aren't showing all comics in database
// this is all comics not just the user's







//~<*{{ Character }}*>~ --------------------------------

var Character_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New character initialised!");
	},
	urlRoot: '/characters'
});

var Character_Collection = Backbone.Collection.extend({
	model: Character_Model,
	url: '/characters'
});

var character_collection = new Character_Collection();
// NO CHARCTER_LIST_VIEW because the user will be searching through this collection
// NO CHARACTER_LIST_VIEW because we're not showing all the characters in the db.




//~<*{{ Badge }}*>~ --------------------------------
var Badge_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Badge initialised!");
	},

	urlRoot: '/badges'
});

var Badge_Collection = Backbone.Collection.extend({
	model: Badge_Model,
	url: '/badges'
});

var badge_collection = new Badge_Collection();
// var badge_list_view = new List_View( {collection: badge_collection} );
//this badge view is to show all possible badges user can earn.
// the ones the user has not earned will be 





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
		this.listenTo(this.collection, 'change', this.render); // is this right?
		// when colleciton changes, reRender list_view ?
		this.collection.fetch();
	},

	addOne: function(item_view){
		var item_view = new Item_view({model: item_view});
		item_view.render();
		this.$el.append(item_view);
	},
	render: function(){
		this.collection.forEach(this.addOne, this);
	}
});




// function generatePage(){
// 	addUserButton();
// 	$('#users').append(user_list_view);
// }

// generatePage();





//~<*{{ FavCharacters }}*>~ --------------------------------


var FavCharacter_Model = Backbone.Model.extend({
	initialize: function(){
	},
	urlRoot: '/fav_characters'
});

var FavCharacter_Collection = Backbone.Collection.extend({
	model: FavCharacter_Model,
	url: '/fav_characters'
});
var favCharacter_collection = new FavCharacter_Collection();


var CharacterView = Backbone.View.extend({
	favCharTemplate: _.template( $('#fav-char-template').html() ),
	className: 'fav-char-el',
	events: {
		"click someElement" : "seeInfo"
	},

	seeInfo: function() {
		var modal = new InfoModalView({ model: this.model });
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render:function(){
		var thisView = this;
		var characterId = (this.model.attributes.character_id);

		character_collection.fetch().done(function() {
			var character = character_collection.where({id: characterId})[0].attributes;

			thisView.$el.html('<img src="' + character.image_url + '"class="fav-char-image"><li class="character-info"><h4>' + character.name + '</h4></br>' + character.description + '</li>')
			// thisView.$el.html(thisView.favCharTemplate({ character: character }));
		})
		
	}
});

var FavCharacterListView = Backbone.View.extend({

	initialize: function(option){
		this.userId = option.userId
		this.listenTo(this.collection, 'add', this.addOne);
		this.collection.fetch();
	},

	addOne:function(item){
		if (item.attributes.user_id == this.userId) {
		   var favCharacter = new CharacterView({ model: item })
		   favCharacter.render();
		   this.$el.append(favCharacter.el)
		}
	}
});

$('#add').on('click', function(){
	var searchedName = $(".fav_characters_input").val(); //input value

	var searchResult = character_collection.where({name: searchedName});
	console.log(searchResult);
	if (searchResult.length != 0) {
		console.log(searchResult[0].id)
		favCharacter_collection.create({user_id: 5, character_id: searchResult[0].id});
	} else {
		console.log("Not Here")
		character_collection.create({name: searchedName}).done(function() {
			favCharacter_collection.create({user_id: 5, character_id: searchResult[0].id});
		})
		
	}
});


var favCharacters = new FavCharacterListView({ collection: favCharacter_collection, el: $('#fav-characters-list'), userId: 5 })

var FormView = Backbone.View.extend({

	events: {
		"click button#add" : "addFavCharacter"
	},

	addFavCharacter: function() {
		console.log("here")
		var searchedName = this.el.val(); //input value
		var searchResult = character_collection.where({name: searchedName});

		if (searchResult.length != 0) {
			console.log(this.collection)
			this.collection.create({user_id: this.userId, character_id: searchResult.id});
		} else {
			console.log("Not Here")
			character_collection.create({name: searchedName});
		}

	}
});

// var formView = new FormView({ el: $(".fav_characters_input"), collection: favCharacter_collection, userId: 5 });

//~<*{{ CharactersComics }}*>~ --------------------------------


// var CharactersComic_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New Characters_comic initialised!");
// 	},

// 	urlRoot: '/characters_comics'
// });
// // var CharactersComic_Collection  = Backbone.Collection.extend({
// // 	model: CharactersComic_Model,
// // 	url: '/'
// // });


//~<*{{ UsersComics }}*>~ --------------------------------

// var UsersComic_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New Users_comic initialised!");
// 	},

// 	urlRoot: '/users_comics'
// });

// var UsersComic_Collection = Backbone.Collection.extend({
// 	model: UsersComic_Model,
// 	url: '/users/' + user_id + "/com"
// });
// //toReadComics, ReadComics, toBuyComics, boughtComics

// var toBuyComics;
// var boughtComics;
// var toReadComics;
// var readComics;



//~<*{{ UsersBadges }}*>~ --------------------------------


// var UsersBadge_Model = Backbone.Model.extend({
// 	initialize: function(){
// 		console.log("New users_badge initialised!");
// 	},

// 	urlRoot: '/users_badges'

// });

// var UsersBadge_Collection = Backbone.Collection.extend({
// 	model: UsersBadge_Model,
// 	//url: '/users/' + id + "/badges"
// });

// var badges;





















