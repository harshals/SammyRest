  
$.sammy("#content", function() {

/*
	this.error = function(message, oError) {
		
		this.log("my custom error for path " + message);
	},
*/

 	this.get("#/errors/:model", function(c) {
	
		var model = c.params['model'];

        var template = main.view + "error.tt";

		c.process(template, {errors : main.models[model].getErrors() });
    });


	
});
  
