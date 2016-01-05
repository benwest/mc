var SELECTED_COLORS = "selectedColors";
//var HOVERED_COLOR = "hoveredColor";

Template.colors.onCreated(function(){
	Session.set('back', this.data.looks.length ? '/child/' + this.data._id : false);
	//Session.set(HOVERED_COLOR, false);
	Session.set(SELECTED_COLORS, this.data.colors);
})

Template.colors.onDestroyed(function(){
	Session.set('back', false);
})

Template.colors.helpers({
	selectedColors: function(){
		return Session.get(SELECTED_COLORS);
	},
	allColors: function(){
		var selected = Session.get(SELECTED_COLORS);
		return Colors.find({}).map(function(color){
			color.selected = _.contains(selected, color._id);
			color.bright = tinycolor(color.color).isLight();
			return color;
		})
	},
	valid: function(){
		return Session.get(SELECTED_COLORS).length > 0;
	}/*,
	hoveredColor: function(){
		return Session.get(HOVERED_COLOR);
	}*/
})

Template.colors.events({
	/*
	'mouseenter .color-swatch': function(){
		Session.set(HOVERED_COLOR, this.name);
	},
	'mouseleave .color-swatch': function(){
		Session.set(HOVERED_COLOR, false);
	},*/
	'click .color-swatch': function(){
		var selected = Session.get(SELECTED_COLORS);
		if(_.contains(selected, this._id)){
			selected = _.without(selected, this._id);
		} else {
			selected.push(this._id);
		}
		Session.set(SELECTED_COLORS, selected);
	},
	'click .done-button': function(event, template){
		Meteor.call('setColors', template.data._id, Session.get(SELECTED_COLORS), function(err, res){
			if(err) {
				alert(err.reason);
			} else {
				Router.go((template.data.looks.length ? '/child/' : '/looks/') + template.data._id);
			}
		})
	},
	'click .looks-link': function(event, template){
		Meteor.call('setColors', template.data._id, Session.get(SELECTED_COLORS), function(err, res){
			if(err) {
				alert(err.reason);
			} else {
				Router.go('/looks/' + template.data._id);
			}
		})
	}
})