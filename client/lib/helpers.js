
sessionDelete = function(key){
	if(_.isArray(key)) return _.each(key, sessionDelete);
	Session.set(key, false);
	delete Session.keys[key];
}

deepClone = function(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

numberAsWords = function(num){

	var ones=['','one','two','three','four','five','six','seven','eight','nine'];
	var tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
	var teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	
	function convert_millions(num){
	    if (num>=1000000){
	        return convert_millions(Math.floor(num/1000000))+" million "+convert_thousands(num%1000000);
	    }
	    else {
	        return convert_thousands(num);
	    }
	}
	
	function convert_thousands(num){
	    if (num>=1000){
	        return convert_hundreds(Math.floor(num/1000))+" thousand "+convert_hundreds(num%1000);
	    }
	    else{
	        return convert_hundreds(num);
	    }
	}
	
	function convert_hundreds(num){
	    if (num>99){
	        return ones[Math.floor(num/100)]+" hundred "+convert_tens(num%100);
	    }
	    else{
	        return convert_tens(num);
	    }
	}
	
	function convert_tens(num){
	    if (num<10) return ones[num];
	    else if (num>=10 && num<20) return teens[num-10];
	    else{
	        return tens[Math.floor(num/10)]+" "+ones[num%10];
	    }
	}
	
    if (num==0) return "zero";
    return convert_millions(num);

}

Template.registerHelper('numberAsWords', numberAsWords);

Template.registerHelper('equals', function(thing1, thing2){
	return thing1 === thing2;
})

Template.registerHelper('or', function(thing1, thing2){
	return thing1 || thing2;
})

Template.registerHelper('oneOf', function(value, list){
	return _.contains( list.split(' '), value );
})

lowerCase = function(string){
	return string.toLowerCase();
}

capitalise = function(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

titleCase = function(string){
	return _.map(string.split(' '), capitalise).join(' ');
}

Template.registerHelper('lowerCase', lowerCase);
Template.registerHelper('capitalise', capitalise);
Template.registerHelper('titleCase', titleCase);

Template.registerHelper('ago', function(date){
	return moment(date).fromNow();
})

function genderWordSelectorFactory(maleWord, femaleWord){
	
	return function(gender, capitalised){
		
		var word;
		
		switch(gender.toLowerCase()){
			
			case 'boy':
				word = maleWord;
				break;
				
			case 'girl':
				word = femaleWord;
				break;
			
		}
		
		if(capitalised) return capitalise(word);
		return word;
		
	}
	
}

Template.registerHelper('heShe', genderWordSelectorFactory('he', 'she'));
Template.registerHelper('himHer', genderWordSelectorFactory('him', 'her'));
Template.registerHelper('hisHer', genderWordSelectorFactory('his', 'her'));

Template.registerHelper('ordinal', function(n){
	if(isNaN(parseInt(n))) return '';
	var s=["th","st","nd","rd"],
       v=n%100;
   return s[(v-20)%10]||s[v]||s[0];
})

Template.registerHelper('isAdmin', function(){
    return Meteor.user() && Meteor.user().username === 'admin';
});

getAge = function(dob){
	return moment().diff(dob, 'years');
}

Template.registerHelper('getAge', getAge);

Template.registerHelper('money', function(number){
    return number.toFixed(2);
});

Template.registerHelper('isRoute', function(route){
    return Router.current().route.getName().indexOf(route) !== -1;
});

Template.registerHelper('selectedIfRoute', function(route){
    return Router.current().route.getName().indexOf(route) !== -1 && 'selected';
});

plural = function(x, singular, plural){
	if(_.isArray(x)) x = x.length;
	if(!_.isString(plural)) plural = singular + 's';
	return x === 1 ? singular : plural;
}

Template.registerHelper('plural', plural);

Template.registerHelper('globalSetting', function(field){
    return globalSettings()[field];
});

Template.registerHelper('sessionGet', function(key){
	return Session.get(key);
});

Template.registerHelper('uid', _.uniqueId)

Template.registerHelper('list', function(array, pluck){
    
    if( array[0][pluck] ) array = _.pluck(array, pluck);
    
    var ret = '';
    
    for(var i = 0; i < array.length - 1; ++i){
        ret += array[i];
        if(i === array.length - 2) ret += ' and ';
        else ret += ', ';
    }
    
    ret += array[array.length - 1];
    
    return ret;
    
})

Template.registerHelper('listSeparator', function(length, i){
	if(_.isArray(length)) length = length.length;
	if(length === 1 || i === length - 1) return '';
	if(i === length - 2) return ' and';
	return ',';
})

Template.registerHelper('count', function(thing){
	if(_.isArray(thing)) return thing.length;
	if(_.isObject(thing)) return _.keys(thing).length;
});

Template.registerHelper('getOrderStatus', function(order){
	
	return capitalise(this.status) + ' at ' + moment(this[this.status + 'At']).format('H[:]MM [on] MMMM Do YYYY');
	
    switch(order.status){
        
        case 'placed':
            return 'Placed at ' + this.placedAt.toString();
            
        case 'dispatched':
            return 'Dispatched at ' + this.dispatchedAt.toString();
            
        case 'completed':
            return 'Completed at ' + this.completedAt.toString();
            
        case 'cancelled':
            return 'Cancelled at ' + this.cancelledAt.toString();
        
    }
        
})

Template.registerHelper('coloredName', function(){
		
	function coloredSpan(color, content){
		
		return '<span style="color:' + color + ';">' + content + '</span>';
		
	}
			
	var colors = _.chain(this.universe.colors)
		.keys()
		.map(function(key){return Colors.findOne(key).color})
		.filter(function(color){ return tinycolor(color).getBrightness() < 185 })
		.value();
	
	var numColors = colors.length;
	
	if( numColors === 0 ) return this.name;
	
	if( numColors === 1 ) return coloredSpan( colors[0], this.name );
	
	var ret = '';
	
	for( var i = 0; i < this.name.length; ++i ){
		
		ret += coloredSpan( colors[ i % numColors ], this.name.charAt(i) );
		
	}
	
	return ret;
	
});
