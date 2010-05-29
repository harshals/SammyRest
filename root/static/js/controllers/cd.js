/// cd specific bind methods
$.sammy('#content' , function() {
  	
	
	this.before(/(new|edit)\/cd/, function(c) {
	
		c.log("comgin here");
		c.redirect("/list/artist");
		c.log("comgin here after");
   	});

});

