
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
	 this.success = true;
	 this.template = null;
	 this.templateVars = {};


	
	this.get("#/", function(c){

		if(!main.loggedIn){
			this.redirect("#/login");
		}else {
			this.redirect('#/home');
		}

	});

	this.get("#/home", function(c){
		

        //initialize the models
		//ideally this should be read from json

		$.getJSON("static/js/schema.json", function(json) {
			
			$.each(json, function(model, obj) {
				
				c.log(model);
				var CLASS = eval(obj['class']);
				main.models[model] = new CLASS({ pk : obj['pk'],  url: main.baseUrl + model } );
			});
		});

		c.swap("Welcome to caselog from main");
	});

	this.before(function(c) {
		
        // initialize all the models here
		// visit me before every request
        
		this.success = true;
		this.template = null;
	});

	this.after( function(c) {
	
		//visit me after every request
		// c.path is not available ???
	});



	// index , generate list of all 

	this.get("#/list/:model", function(c) {
		
        var model = c.params['model'];

        var template = main.view + model + "_list.tt";

      	if(main.models[model].all()) {
		
			c.process(template, main.models[model].templateVars("list") );
		}else {
		
			c.redirect("#/errors/" + model );
		};
		c.render();
	});

	// get single item
	
	this.get("#/edit/:model/:id", function(c){
        
        var model 		= c.params['model'];
        var id 			= c.params['id'];
        var template 	= main.view + model + "_edit.tt";

 	 	if(main.models[model].find(id) ) {
		
			c.process(template , main.models[model].templateVars("edit"));
		}else {

			c.redirect("#/errors/" + model );
		}
		c.render();
	});

	// delete single item
	
	this.get("#/delete/:model/:id", function(c){
        
        var model = c.params['model'];
        var id = c.params['id'];

        if (confirm("Are you sure ?") && !main.models[model].remove(id)) {

			c.redirect("#/errors/" + model );
        }else {
			c.redirect("#/list/" + model);
		}

	});

	// new item
	this.get("#/new/:model", function(c){
		
        var model = c.params['model'];

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
	this.post("#/save/:model", function(c) {

        var model = c.params['model'];
        
	    if (!main.models[model].save(c.params.toHash())) {

			c.redirect("#/errors/" + model);
		}else {

			c.redirect("#/list/" + model);
		}
		
		return false;
	});

	// display search form
	this.get("#/search/:model", function(c){

        var model = c.params['model'];
        
		var template = main.view + model + "_search.tt";
		this.process(template , {});
    });

	// submit search form
	this.post("#/search/:model", function(c){

        var model = c.params['model'];
        main.models[model].data = c.params.toHash();

	    main.models[model].search();
        
		if (main.models[model].errors.length) {
            alert("got errors");
        }
		c.redirect("#/list/" + model);
    });

		

});


