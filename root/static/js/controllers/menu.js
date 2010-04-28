var menu = $.sammy('#menu', function() {


	 this.element_selector = '#menu';
	 this.use(jemplate);
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
});



