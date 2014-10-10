
//~<*{{ MODEL }}*>~ --------------------------------

var User = Backbone.Model.extend({
	initialize: function(){
		console.log("New user initialised!");
	}
});

var Character = Backbone.Model.extend({
	initialize: function(){
		console.log("New character initialised!");
	}
});

var Comic = Backbone.Model.extend({
	initialize: function(){
		console.log("New comic initialised!");
	}
});

var Badge = Backbone.Model.extend({
	initialize: function(){
		console.log("New Badge initialised!");
	}
});

var Fav_character = Backbone.Model.extend({
	initialize: function(){
		console.log("New Fav_character initialised!");
	}
});

var Characters_comic = Backbone.Model.extend({
	initialize: function(){
		console.log("New Characters_comic initialised!");
	}
});

var Users_comic = Backbone.Model.extend({
	initialize: function(){
		console.log("New Users_comic initialised!");
	}
});

var Users_badge = Backbone.Model.extend({
	initialize: function(){
		console.log("New users_badge initialised!");
	}
});


//~<*{{ COLLECTION }}*>~ --------------------------------





