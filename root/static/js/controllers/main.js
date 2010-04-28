
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
	 this.models = {};
     this.view = "views/default/";
     this.tvars = {};

	 this.get("#/", function(c){

		if(!main.loggedIn){
			this.redirect("#/login");
		}else {

			this.redirect('#/home');
		}

	});
	this.get("#/home", function(c){
		
        // initialize all the models here
		main.models["artist"] = new Artist( { pk : 'artistid',  url: main.baseUrl + "artist" });
		main.models["cd"] = new Artist( { pk : 'artistid',  url: main.baseUrl + "cd" });

        //initialize their templates

		c.swap("Welcome to caselog from main");
	});

});


