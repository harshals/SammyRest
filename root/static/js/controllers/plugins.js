

var utils = function(app) {
	
	this.helpers({
		splat: function(index) {
			
			return this.params.splat[index]
		},
		process: function(path, data) {
	  
			Jemplate.process(path, data || this ,app.element_selector);
		}
  	});

};
