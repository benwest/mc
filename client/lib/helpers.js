i2iStatusDescription = function(order){
	
	var header = order.i2iOrderHeader.get();
	
	console.log(header);
	
	if (header === null) return;
	if (header === false) return "Placed";
	
    switch(header.SOStatus){
	    
	    case '78':
	    	return 'Completed';
			    
	    case '76':
	    	return order.returnsConfirmed ? 'Returns Confirmed' : 'Dispatched';
	    
	    default:
	    	return header.SOStatus;
	    	
    }

}

Template.registerHelper('formatDate', function(date, format){
	return moment(date).format(format);
})

Template.registerHelper('equals', function(thing1, thing2){
	return thing1 === thing2;
})

Template.registerHelper('gt', function(thing1, thing2){
	return thing1 > thing2;
})

Template.registerHelper('or', function(thing1, thing2){
	return thing1 || thing2;
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

plural = function(x, singular, plural){
	if(_.isArray(x)) x = x.length;
	if(!_.isString(plural)) plural = singular + 's';
	return x === 1 ? singular : plural;
}

Template.registerHelper('plural', plural);

posessive = function(word){
	return word.toLowerCase().slice(-1) === 's' ? word + "'" : word + "'s";
}

Template.registerHelper('posessive', posessive);

Template.registerHelper('globalSetting', function(field){
    return globalSettings()[field];
});

Template.registerHelper('sessionGet', function(key){
	return Session.get(key);
});

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

Template.registerHelper('count', function(thing){
	if(_.isArray(thing)) return thing.length;
	if(_.isObject(thing)) return _.keys(thing).length;
});