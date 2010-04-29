  
$.sammy("#content", function() {

 	this.get(/\#\/errors\/(\w+)$/, function(context) {
	
		var model = this.split(0);

        var template = main.view + "errors.tt";
		this.process(template, main.models[model].list_errors() );
    });
});
  
