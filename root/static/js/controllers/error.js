  
$.sammy("#content", function() {

 	this.get('#/errors', function(context) {
	
		context.log("coming here");
		//this.errors = this.articles.errors.all();
		this.partial('views/main/error.jshtml');
    });
});
  
