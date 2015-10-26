Template.inlineMultiSelect.onCreated(function(){
	Session.set(this.data.id, []);
	Session.set(this.data.id + 'Modifying', true);
	Session.set(this.data.id + 'Valid', false);
});

Template.inlineMultiSelect.onDestroyed(function(){
	Session.set(this.data.id, false);
	Session.set(this.data.id + 'Modifying', false);
	Session.set(this.data.id + 'Valid', false);
});

Template.inlineMultiSelect.helpers({
	'selectId': function(){
		return this.id + 'Select';
	},
	'modifying': function(){
		return Session.get(this.id + 'Modifying');
	},
	'values': function(){
		
		var selected = Session.get(this.id);
		var newValue = Session.get(this.id + 'Select');
		
		if(newValue){
			newValue = {name: newValue, i: selected.length};
			selected.push(newValue);
			Session.set(this.id + 'Select', false);
			Session.set(this.id, selected);
		}
		
		return selected;
		
	},
	'listSeparator': function(context){
				
		var options = context.options.split(', ').length;
		var selected = Session.get(context.id).length;
		var length;
		
		if(options === selected){
			return this.i === selected - 1 ? '' : this.i === selected - 2 ? ' and ' : ', ';
		} else {
			return this.i === selected - 1 ? ' and ' : ', ';
		}
		
	},
	'allOptionsSelected': function(){
		return Session.get(this.id).length >= this.options.split(', ').length;
	},
	'notLast': function(id){
		return this.i !== Session.get(id).length - 1;
	},
	'filteredOptions': function(){
		var options = this.options.split(', ');
		var selected = _.pluck( Session.get(this.id), 'name' );
		return _.reject(options, function(option, i){
			return _.contains(selected, option);
		}).join(', ');
	}
})

Template.inlineMultiSelect.events({
	'click .select-modify': function(){
		Session.set(this.id + 'Valid', true);
		Session.set(this.id + 'Modifying', !Session.get(this.id + 'Modifying'));
	},
	'click .remove-selection': function(event, template){
		var selected = Session.get(template.data.id);
		selected.splice(this.i, 1);
		_.forEach(selected, function(thing, i){
			thing.i = i;
		})
		Session.set(template.data.id, selected);
	}
})