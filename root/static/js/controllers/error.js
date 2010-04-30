  
$.sammy("#content", function() {

/*
	this.error = function(message, oError) {
		
		this.log("my custom error for path " + message);
	},
*/

	this.after( function() {
	
		var args = this.path.split('/');
		this.log(args);
		var model = args[1];
		this.log("runnign after every " + model + " -> " + this.path);
	});

 	this.get(/\#\/errors\/(\w+)$/, function(c) {
	
		var model = c.splat(0);

        var template = main.view + "error.tt";

		main.error("my customer Error" );
		c.process(template, {errors : main.models[model].getErrors() });
    });


	
});
  
