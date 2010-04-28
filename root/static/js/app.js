(function($){
    var app = $.sammy(function() {
         this.element_selector = '#main';
         this.use(Sammy.Template);
         this.loggedIn = false;
         var regex = location.href.match(/\/a\/([a-zA-Z]*)\/?/);
         
         if(regex[1]) {
            this.firm = regex[1];
            this.baseUrl = "/a/" + this.firm;
         }

         this.bind('logged-out', function(e, data) {

		 alert("coming here");
             app.log('logged out called..')
	     app.redirect('#login');
	});

        this.bind('logged-in', function(e, data){

            this.log('logged in.');
            this.redirect('#/');
        });

        this.get('#/login', function(c){
		c.log("i m not logge in");
                if(!app.loggedIn){
			
			Jemplate.process( "views/default/login.tt", {}, "#content");

                } 
         });
         this.get('#login2', function(context){
                if(!app.loggedIn){
                    $.getJSON(app.baseUrl + "/users/login.json", function(data){
                            app.loggedIn = data.loggedIn;
                            if(!app.loggedIn){
                                var item = {action:"#login"};
                                context.partial('/js/sammy/templates/login.template', {item: item}, function(rendered) {
                                    context.$element().append(rendered);
                                  });
                            } else {
                                  context.trigger('logged-in');
                            }
                    });
                } 
         });

         this.post('#login', function(context){

             $.ajax({
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
         });

         this.get("#/", function(context){

             c.log(app.loggedIn);
             if(!app.loggedIn){
	     
		c.log(app.loggedIn);
                 context.trigger('logged-out');
                 return;
             }
             context.$element().append('logged in');

         });

        this.get('#/contacts/:id', function(c){
			
			  $.Read( app.baseUrl + "/contacts/" + c.params["id"] + ".json", function(json) {
				
					alert("i got tjson");
					c.log(json);
			});
        });

    
    });

     $(function() {
            app.run('#/');
      });

})(jQuery);

