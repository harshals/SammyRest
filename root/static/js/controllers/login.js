// Login Controller 
$.sammy("#content", function() {

	 this.get('#/login', function(c){

		 this.process( "views/default/login.tt", {}, "#content");

	});

	this.post('#/login', function(context){

		/* $.ajax({
			type: 'post',
			url: app.baseUrl +  "/users/login.json",
			dataType: 'json',
			data: $('#loginForm').serialize(),
			success: function(data){
			if(data.loggedIn)
				context.trigger('logged-in');
			else
				alert('error');
			}
		})
		*/
		main.loggedIn = true;
		this.redirect('#/');
	 });
});

