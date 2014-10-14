//~<*{{ User Collection}}*>~ --------------------------------
// 
// 

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





// ~<*{{ Comic Views}}*>~ --------------------------------
// 
// 

var ComicModel = Backbone.Model.extend({
	initialize: function(){
		console.log("New comic initialised!");
	},
	urlRoot: '/comics'
});

var UserComicModel = Backbone.Model.extend({
	initialize: function(){
		console.log("New comic initialised!");
	},
	urlRoot: '/user_comics'
});

var ComicCollection = Backbone.Collection.extend({
	model: ComicModel,
	url: '/comics'
});

var UserComicCollection = Backbone.Collection.extend({
	model: UserComicModel,
	url: '/user_comics'
	
});

var comicCollection = new ComicCollection();
comicCollection.fetch();

var userComicCollection = new UserComicCollection();
userComicCollection.fetch();

var ComicView = Backbone.View.extend({
	// comicTemplate: _.template( $('#comic-template').html() ),
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
		var comicId = (this.model.attributes.comic_id);

		comicCollection.fetch().done(function() {
			var comic = comicCollection.where({id: comicId})[0].attributes;

			thisView.$el.html('<img src="' + comic.thumbnail + '"class="comic-image">')//<li class="character-info"><h4>' + comic.title + '</h4></br>' + comic.date_issued + '</br>' + comic.description + '</li>')
			// thisView.$el.html(thisView.favCharTemplate({ character: character }));
		})	
	}
});

var ComicListView = Backbone.View.extend({

	initialize: function(option){
		this.userId = option.userId
		this.list = option.list
		this.status = option.status
		this.listenTo(this.collection, 'add', this.addOne);
		this.collection.fetch();
	},

	addOne:function(item){
		if (item.attributes.user_id == this.userId && this.list == 'buy' && item.attributes.bought == this.status) {
		   var comic = new ComicView({ model: item })
		   comic.render();
		   this.$el.append(comic.el)

		} else if (item.attributes.user_id == this.userId && this.list == 'buy' && item.attributes.bought == this.status) {
		   var comic = new ComicView({ model: item })
		   comic.render();
		   this.$el.append(comic.el)

		} else if (item.attributes.user_id == this.userId && this.list == 'read' && item.attributes.read == this.status) {
		   var comic = new ComicView({ model: item })
		   comic.render();
		   this.$el.append(comic.el)

		} else if (item.attributes.user_id == this.userId && this.list == 'read' && item.attributes.read == this.status) {
		   var comic = new ComicView({ model: item })
		   comic.render();
		   this.$el.append(comic.el)
		   console.log(userBadgeCollection)
		   
		   console.log('hey there')
		}
	}
});

$('#to_buy_add').on('click', function(){
	var searchedComic = $(".to_buy_input").val();
	var searchResult = comicCollection.where({title: searchedComic});

	if (searchResult.length != 0) {

		userComicCollection.create({user_id: 1, comic_id: searchResult[0].id, bought: false});
	}
});

$('#bought_add').on('click', function(){
	var searchedComic = $(".bought_input").val();
	var searchResult = comicCollection.where({title: searchedComic});

	if (searchResult.length != 0) {

		userComicCollection.create({user_id: 1, comic_id: searchResult[0].id, bought: true});
	}
});

$('#to_read_add').on('click', function(){
	var searchedComic = $(".to_read_input").val();
	var searchResult = comicCollection.where({title: searchedComic});

	if (searchResult.length != 0) {

		userComicCollection.create({user_id: 1, comic_id: searchResult[0].id, read: false});
	}
});

$('#read_add').on('click', function(){
	var searchedComic = $(".read_input").val();
	var searchResult = comicCollection.where({title: searchedComic});

	if (searchResult.length != 0) {

		userComicCollection.create({user_id: 1, comic_id: searchResult[0].id, read: true});

		var userHasRead = userComicCollection.where({user_id: 1, read: true});
		var readQty = userHasRead.length;
		console.log(readQty)


		if(readQty == 1){
			var badge = badge_collection.where({name: "Avid Reader - 1"})[0]
			$('#badge_3').removeClass('gray');
			usersBadge_collection.create({user_id: 1, badge_id: badge.id});

		} else if (readQty == 5){
			var badge = badge_collection.where({name: "Avid Reader - 5"})[0]
			$('#badge_5').removeClass('gray');
			usersBadge_collection.create({user_id: 1, badge_id: badge.id});
			
		} else if (readQty == 10){
			var badge = badge_collection.where({name: "Avid Reader - 10"})[0]
			$('#badge_4').removeClass('gray');
			usersBadge_collection.create({user_id: 1, badge_id: badge.id});
			
		// } else if (readQty == 20){
		// 	$('#avid_reader_20').removeClass('.grey');
		// 	//Badge.create( {name: 'avid_reader_20'} );
		// } else if (readQty == 50){
		// 	$('#avid_reader_50').removeClass('.grey');
		// 	//Badge.create( {name: 'avid_reader_50'} );
		// } else if (readQty == 100){
		// 	$('#avid_reader_100').removeClass('.grey');
		// 	//Badge.create( {name: 'avid_reader_100'} );
		// }
		// 	// console.log(usersBadge_collection.models)
		// 	// if (userBadgeCollection.models.length == 1){

		// 	// 	userBadgeCollection.create({user_id: this.userId, badge_id: });
		// 	// }

		}
	}
});


var toBuyComics = new ComicListView({ collection: userComicCollection, el: $('.to-buy'), userId: 1, list: 'buy', status: false });
var boughtComics = new ComicListView({ collection: userComicCollection, el: $('.bought'), userId: 1, list: 'buy', status: true });
var toReadComics = new ComicListView({ collection: userComicCollection, el: $('.to-read'), userId: 1, list: 'read', status: false });
var readComics = new ComicListView({ collection: userComicCollection, el: $('.read'), userId: 1, list: 'read', status: true });
// 
// 
// NO COMIC_LIST_VIEW because we aren't showing all comics in database
// this is all comics not just the user's







//~<*{{ Character Collection}}*>~ --------------------------------
// 
// 

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
character_collection.fetch();
// NO CHARCTER_LIST_VIEW because the user will be searching through this collection
// NO CHARACTER_LIST_VIEW because we're not showing all the characters in the db.




//~<*{{ Badge Views}}*>~ --------------------------------
// 
// 
var UsersBadge_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Badge initialised!");
	},

	urlRoot: '/user_badges'
});

var Badge_Model = Backbone.Model.extend({
	initialize: function(){
		console.log("New Badge initialised!");
	},

	urlRoot: '/badges'
});

var UsersBadge_Collection = Backbone.Collection.extend({
	model: UsersBadge_Model,
	url: '/user_badges'
});

var Badge_Collection = Backbone.Collection.extend({
	model: Badge_Model,
	url: '/badges'
});

var usersBadge_collection = new UsersBadge_Collection();
usersBadge_collection.fetch();

var badge_collection = new Badge_Collection();
badge_collection.fetch();

var BadgeView = Backbone.View.extend({
	className: 'badge',
	initialize: function(){
		this.listenTo(this.model, 'remove', this.remove);
	},
	render: function(){
		var thisView = this;
		var badgeId = (this.model.attributes.badge_id);

		badge_collection.fetch().done(function() {
			var badge = badge_collection.where({id: badgeId})[0].attributes;
			// thisView.$el.html('<img src="' + badge.image_src + '"><h4>' + badge.name + '</h4>');
		});
	}
});

var BadgeListView = Backbone.View.extend({
	tagName: 'section',
	className: 'badge-list',
	initialize: function(option){
		this.userId = option.userId;
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'change', this.render);
		this.collection.fetch();
	},
	addOne: function(item){

		var badgeView = new BadgeView({ model: item});
		badgeView.render();
		// this.$el.append(badgeView.el);
	}
});

var usersBadges = new BadgeListView({ collection: usersBadge_collection, el: $('#badges'), userId: 1});

// var this_user_id = 1;
// var this_user_comicCollection = userComicCollection.where({user_id: this_user_id});
// var userHasRead = [];
// _.each(this_user_comicCollection, function(item){
// 	if(item.attributes.read == true){
// 		userHasRead.push(item)
// 	}

//~<*{{ FavCharacters Views}}*>~ --------------------------------
// 
// 


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
	// favCharTemplate: _.template( $('#fav-char-template').html() ),
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
			thisView.$el.html('<img src="' + character.image_url + '"class="fav-char-image">')//<li class="character-info"><h4>' + character.name + '</h4></br>' + character.description + '</li>')
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

$('.add-character').on('click', function() {
	var searchedName = $("#fav_input").val();
	var searchResult = character_collection.where({name: searchedName});
	console.log(character_collection)
	console.log(searchedName)
	console.log(searchResult)
	if (searchResult.length != 0) {
		console.log(searchResult[0].id)
		favCharacter_collection.create({user_id: 1, character_id: searchResult[0].id});
	// } else {
	// 	console.log("Not Here")
	// 	character_collection.create({name: searchedName})
	// 	setTimeout(function() {

	// 		var charId = character_collection.where({name: searchedName})[0].id
	// 		favCharacter_collection.create({user_id: 1, character_id: charId});	
	// 	}, 4000);
	}
});


var favCharacters = new FavCharacterListView({ collection: favCharacter_collection, el: $('#fav-characters-list'), userId: 1 })

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

var comicArray = []

comicCollection.fetch().done(function(){
	comicCollection.forEach(function(comic){
		comicArray.push(comic.attributes.title)
	})
	_.each($('.add_comic'), function(input) {
		input.autocomplete({source: comicArray})
	})

})


// var userBadges = usersBadge_collection.where({user_id: 1})

// var badges_to_ungrey_ids = []
// var badgeArray = []

// _.each(userBadges, function(userBadge) {
// 	badges_to_ungrey_ids.push(userBadge.attributes.badge_id)
// });

// _.each(badges_to_ungrey_ids, function(id) {
// 	var badges = badge_collection.where({id: id})
	
// 	_.each(badges, function(badge) {
// 		badgeArray.push(badge);
// 	});
// });

// _.each(badgeArray, function(badge) {
// 	if(badge.name == "Avid Reader - 1") {
// 		$('#badge_3').removeClass('gray')
// 	}
// })

function badgeSetUp(){
	//get usersBadges
	var this_user_id = 1;

	//all the user badges belonging to user 1
	var this_user_badges = usersBadge_collection.where({user_id: this_user_id});


	_.each(this_user_badges, function(userbadge){

		_.each(badge_collection, function(badge){
			if(badge.id == userbadge.badge_id){
				if(badge.name == "Avid Reader - 1" ){
					$('#badge_3').removeClass('gray');
				} else if (badge.name == " avid reader 1 "){

				}
			}
		});

	});
}

badgeSetUp()

$('.to-buy, .bought, .to-read, .read').sortable({connectWith: '.list'}).disableSelection();
// $('.list').on( "sortupdate", function( event, ui ) {
// 	var comicId = ui.item.children()[0].id;
// 	var contact = contacts.get(contactId);
// 	console.log(contact)
// 	console.log(event.target.id)
// 	contact.set('category_id', Number(event.target.id));
// 	contact.save();
// });





