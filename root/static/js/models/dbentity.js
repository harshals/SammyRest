

Class('DbEntity', {
 
		
		has : { 
			pk : {is : 'ro', init : 'id' },
			list : { is : 'rw' , isa : Joose.I.Array , init: function() { return []} },
			url : { is : 'ro' , init : ''},
			message : {is : 'rw' , init : ''},
			data : { is : 'rw' , init: function() { return {} }},
			ajaxStatus : {is : 'rw', init: true},
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
					success : function(json) {
						
						model.message = json.message;
						model.data = json.data;
						model.list = json.list;
						model.ajaxStatus = json.success;
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
				
				return this.data;
			},
			update : function(id) {

				if (this.validate())
				this.xhr('POST', this.url + "/" + id);

				return this.data;
			},
			create : function() {
				
				if (this.validate())
				this.xhr('PUT', this.url );

				return this.data;
			},
			save : function() {
				
				this.isNew() ? this.update(this.data[ this.pk ]) : this.create();

				return this.data;
			},
			remove : function(id) {

				this.xhr('DELETE', this.url + "/" + id);

				return this.message;
			},
			isNew : function() {
				return defined (this.data[ this.pk ]);
			},
            templateVars : function(type) {
                
                var tvars = {};
                var name = this.meta.name.toLowerCase();

                tvars[name] = {};
                
                tvars[name] = (type == 'list') ?  { 'list' : this.list } :  this.data ;

                return tvars;
            }
		}

});





