

var utils = function(app) {
	
	this.helpers({
		splat: function(index) {
			
			return this.params.splat[index]
		},
		process: function(path, data) {
	  		
			$.extend(main.templateVars, data || this);
			main.template = path;

			//Jemplate.process(path, data || this ,app.element_selector);
		},
		render : function() {
			
			var templateVars = main.templateVars;

			Jemplate.process(main.template, templateVars);
		}
  	});

};
