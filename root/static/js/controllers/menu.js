var menu = $.sammy('#menu', function() {


	 this.element_selector = '#menu';
	 this.use(utils);
	 this.debug = true;

	 this.get('#/artists', function(context) {

			 main.run('#/artist');
	 });
	 this.get('#/logout', function(context) {
	 		main.loggedIn = false;
			main.setLocation('#/');
	 });

	this.get('#/home', function(c) {
		main.run("#/home");
	});	
	this.get('#/new_artist', function(context) {
	 	context.log("coming here");
			 main.run('#/new/artist');
	 });


});



