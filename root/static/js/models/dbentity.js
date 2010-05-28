

Class('DbEntity', {
 
		
		has : { 
			// primary key eg. _id
			pk : {is : 'ro', init : 'id' },

			// value of primary key of the current object (if any)
			id : {is : 'rw' , init : '' },

			list : { is : 'rw' , isa : Joose.I.Array , init: function() { return []} },

			// REST url
			url : { is : 'ro' , init : ''},

			// any message received from server
			message : {is : 'rw' , init : ''},

			// data revceived or give to server
			data : { is : 'rw' , init: function() { return {} }},

			// status of the last request
			ajaxStatus : {is : 'rw', init: true},

			// validation and other erros
			errors :{ is : 'rw' , isa : Joose.I.Array  , init : function() { return [] }} 
		},

		methods : {
			
			xhr : function (type, url) {
				
				var x = function(model) {

                    $.ajax( {
                        type : type,
                        url : url,
                        data : model.data,
                        dataType : 'json',
                        async : false,
                        error : function(req, textStatus, ErrorThrown) {
							  var js = $.parseJSON(req.responseText);
							  model.onError(js);
							  return false;
						},
						success : function(json) {

							if (typeof(json) != 'undefined' && json != null) {

								model.onSuccess(json) ;
							}
                        }
                    });

				}(this);
			},
			all : function () {
				
				this.xhr('GET', this.url);
				
				return this.list;
			},

			find : function(id) {
        		
				this.xhr('GET', this.url + "/" + id);
				
				return this.ajaxStatus;
			},
			search : function() {

				this.xhr('POST', this.url );
			},
			update : function(id) {

				if (!this.validate())
					return false;

				this.xhr('POST', this.url + "/" + id);

				return this.ajaxStatus;
			},
			create : function() {
				
				if (!this.validate())
					return false;

				this.xhr('PUT', this.url );

				return this.ajaxStatus;
			},
			save : function(data) {
				
				this.data = data;
				
				return (this.isNew() ) ? this.update(this.data[ this.pk ]) : this.create();

			},
			remove : function(id) {

				this.xhr('DELETE', this.url + "/" + id);

				return this.ajaxStatus;
			},
			isNew : function() {
				
				return (typeof (this.data[ this.pk ]) == 'undefined' || this.data[ this.pk] == '') ? false : true;
			},
            templateVars : function(type) {
                
                var tvars = {};
                var name = this.meta.name.toLowerCase();

                tvars[name] = {};
                
                tvars[name] = (type == 'list') ?  { 'list' : this.list } :  this.data ;

                return tvars;
            },
			onSuccess : function(json) {
                            
               this.setErrors(json.messages);
               this.data = json.data;
			   this.list = json.list;
			   this.ajaxStatus = json.success || true;
			},
			onError : function(json) {
                            
				this.ajaxStatus = false;
				if (typeof(json) != 'undefined' && json != null) {
                      this.setErrors(json.messages);
				}else {
					// assuming network is down
					//  jquery bug ??
					this.setErrors(["Could not reach the server. Please check your network connection!!"]);
				}
            },
		}

});





