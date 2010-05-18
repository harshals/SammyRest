
 var main = $.sammy("#content", function() {


	 this.element_selector = '#content';
	 this.use(utils);
	 this.debug = true;
	 this.raise_errors = true;
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
	 this.model = "";
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

	this.before(function(c) {
		
		c.log("disecting " + c.path);

		args = c.path.split('/');
		args.shift();
		main.model = args.shift();
		main.action = args.shift();
		main.args = args;
	});


	// index , generate list of all artist

	this.get(/\#\/(artist|cd)$/, function(c) {
		
        var model = this.splat(0);

        var template = main.view + model + "_list.tt";

        main.models[model].all();

		this.process(template, main.models[model].templateVars("list") );
	});

	// get single item
	
	this.get(/\#\/(artist|cd)\/edit\/(\d+)$/, function(c){
        
        var model = main.model;
        var id = main.args[0];

        main.models[model].find(id);
        
        var template = main.view + model + "_edit.tt";
		
		this.process(template , main.models[model].templateVars("edit") );
	});

	// delete single item
	
	this.get(/\#\/(artist|cd)\/delete\/(\d+)$/, function(c){
        
        var model = main.model;
        var id = main.args[0];

        main.models[model].remove(id);

        if (!main.models[model].ajaxStatus) {

			this.redirect("#/" + model + "/errors");
        }else {

			this.redirect("#/" + model);
		}

	});

	// new item
	this.get(/\#\/(artist|cd)\/new/, function(c){
		
        var model = main.model;

        var template = main.view + model + "_edit.tt";

		this.process(template , {});
	});

	
	this.before({ only: {verb: 'post'}}, function(c ) {
			
		
		//c.target is form handle
		$(c.target).validate();
		if (!$(c.target).valid()) {

			return false;
		}

		return true;
	});
	
	// update or create single item
	this.post(/\#\/(artist|cd)\/save/, function(c) {

        var model = main.model 
        
	    if (!main.models[model].save(c.params.toHash())) {

			this.redirect("#/errors/" + model);
		}
		
		c.redirect("#/" + model);

		//main.runRoute("get", "#/" + main.model);
		return false;
	});

	// display search form
	this.get(/\#\/(artist|cd)\/search/, function(c){

        var model = this.splat(0);
        
		var template = main.view + model + "_search.tt";
		this.process(template , {});
    });

	// submit search form
	this.post(/\#\/(artist|cd)\/search/, function(c){

        var model = this.splat(0);
        main.models[model].data = c.params.toHash();

	    main.models[model].search();
        
		if (main.models[model].errors.length) {
            alert("got errors");
        }
		main.runRoute("get", "#/" + model);
    });

		

});


