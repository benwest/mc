queryFactory = function(template) {
	
    return function(data) {
	    
	    var query = template.replace(/{([^{}]*)}/g,
	        function (a, b) {
	            var r = data[b];
	            return typeof r === 'string' || typeof r === 'number' ? r : a;
	        }
	    );
	    
	    return Sql.q(query);
	    
	}
	
};