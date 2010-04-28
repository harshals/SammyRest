
 var main = $.sammy("#content", function() {


	 this.element_selector = '#content';
	 this.use(jemplate);
	 this.debug = true;
	 this.loggedIn = true ;
	 /*var regex = location.href.match(/\/a\/([a-zA-Z]*)\/?/);

	 if(regex[1]) {
	 	this.firm = regex[1];
	 	this.baseUrl = "/a/" + this.firm;
	 }
	*/
	 this.firm = "caselog";
	 this.baseUrl = "/api/rest/";
	 this.artist = {};

	 this.get("#/", function(c){

		if(!main.loggedIn){
			this.redirect("#/login");
		}else {

			this.redirect('#/home');
		}

	});
	this.get("#/home", function(c){
		
		main.artist = new Artist( { pk : 'artistid',  url: main.baseUrl + "artist" });
		c.swap("Welcome to caselog from main");
	});

});


