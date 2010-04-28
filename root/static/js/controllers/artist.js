// artist controller
$.sammy('#content' , function() {
  	

	this.get(/\#\/(artist|cd)$/, function(c) {

        var model = c.params.splat.pop();
        
        // template = "views/default/artist_list.tt2"
        var template = main.view + model + "_list.tt";

        main.models[model].all();

		this.process(template, main.models[model].templateVars("list") );
	});

	this.get(/\#\/(artist)\/edit\/(.*)/, function(c){
        
        var model = c.params.splat.shift();
        var id = c.params.splat.pop();
        main.models[model].find(id);
        
        var template = main.view + model + "_edit.tt";
		
		this.process(template , main.models[model].templateVars("edit") );
	});

	this.get(/\#\/(artist|cd)\/delete\/(.*)/, function(c){
        
        var model = c.params.splat.shift();
        var id = c.params.splat.pop();
        main.models[model].remove(id);

        if (main.models[model].errors.length) {
            alert("got errors");
        }
		this.redirect("#/" + model);
	});


	this.get(/\#\/(artist|cd)\/new/, function(c){
		
        var model = c.params.splat.shift();
        var template = main.view + model + "_edit.tt";
		this.process(template , {});
	});
	
	this.post(/\#\/(artist|cd)$/, function(c) {
		
		delete c.params.$form;

        var model = c.params.splat.shift();
        main.models[model].data = c.params.toHash();

	    main.models[model].save();

        if (main.models[model].errors.length) {
            alert("got errors");
        }
		main.runRoute("get", "#/" + model);
	});

	this.get('#/artist/search', function(context) {

		this.partial('views/default/artist_search.tt');
    });

	this.post('#/artist/search', function(context) {

		this.partial('views/artist/index.jshtml');
    });

});
