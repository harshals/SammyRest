// artist controller
$.sammy('#content' , function() {
  	

	this.get('#/artist', function(c) {

		//Artist.my.url = "/api/rest/artist";

		main.artist.all();
		
		this.process('views/default/artist_list.tt', { artist : main.artist.list });
	});

	this.get('#/artist/edit/:id', function(c){
        
        main.artist.find(this.params["id"]);
		
		this.process('views/default/artist_edit.tt' , { artist: main.artist.data } );
	});

	this.get('#/artist/delete/:id', function(c){
        
		main.artist.remove(c.params["id"]);

        if (main.artist.errors.length) {
            alert("got errors");
        }
		this.redirect("#/artist");
	});


	this.get('#/artist/new', function(context) {
		
		this.process('views/default/artist_edit.tt' );
	});
	
	this.post('#/artist', function(c) {
		
		delete c.params.$form;

        main.artist.data = c.params.toHash();

	    main.artist.save();

        if (main.artist.errors.length) {
            alert("got errors");
        }
		main.runRoute("get", "#/artist");
	});

	this.get('#/artist/search', function(context) {

		this.partial('views/default/artist_search.tt');
    });

	this.post('#/artist/search', function(context) {

		this.partial('views/artist/index.jshtml');
    });

});
