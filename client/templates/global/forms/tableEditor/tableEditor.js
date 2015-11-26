Template.tableEditor.onCreated(function(){

	var numFields = this.data.fields.length;
	var mostColumns = Math.floor(10 / numFields);
	var firstColumn = 10 - (mostColumns * (numFields - 1) );
	
	this.data.fields = _.map( this.data.fields, function(field, i){
		field.columns = i === 0 ? firstColumn : mostColumns;
		return field;
	});
	
})

Template.tableEditor.helpers({
	'values': function(){
		return Collections[this.collection].find({});
	},
	'fillFields': function(fields){
		var document = this;
		return _.map( fields, function(field){
			field = EJSON.clone(field);
			field.value = document[field.name] || field.default;
			field.id = document._id;
			return field;
		})
	}
})

Template.tableEditor.events({
	
	'submit form': function(event, template){
		
		event.preventDefault();
		
		var form = $(event.target);
		var inputs = form.find('input.valid');
		
		var document = {};
		
		inputs.each(function(){
			var $this = $(this);
			var name = $this.attr('name').split('_')[0];
			var value = $this.val();
			if(!isNaN(Number(value))) value = Number(value);
			document[name] = value;
		});
		
		if(form.hasClass('table-update')){
			
			Collections[template.data.collection].update(this._id, {$set: document});
			
		} else if (form.hasClass('table-add')){
						
			Collections[template.data.collection].insert(document);
			
			var fields = this.fields;
			
			inputs.each(function(){
				var $this = $(this);
				var name = $this.attr('name');
				var fieldName = name.substr(0, name.length - 4);
				var field = _.find( fields, function(f){
					return f.default && f.name === fieldName;
				});
				Session.set(name, field ? field.default : false);
			})
			
		}
		
	},
	
	'click .remove-item': function(event, template){
		
		Collections[template.data.collection].remove(this._id);
		
	}
	
})

Template.tableEditorField.helpers({
	'fieldId': function(){
		return this.name + '_' + (this.id || 'add');
	}
})