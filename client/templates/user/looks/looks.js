var SELECTED_LOOKS = "selectedLooks";
var SHOW_PREVIEW = 'showLookPreview';
var PREVIEW = "lookPreview";
//var HOVERED_LOOK = "hoveredColor";

Template.looks.onCreated(function(){
	Session.set('back', this.data.looks.length ? '/child/' + this.data._id : false);
//	Session.set(HOVERED_LOOK, false);
	Session.set(SELECTED_LOOKS, this.data.looks);
	Session.set(PREVIEW, false);
	Session.set(SHOW_PREVIEW, false);
})

Template.looks.onDestroyed(function(){
	Session.set('back', false);
})

Template.looks.helpers({
	largeGridSize: function(){
		return this.gender === 'boy' ? 4 : 5
	},
	selectedLooks: function(){
		return Session.get(SELECTED_LOOKS);
	},
	allLooks: function(){
		var selected = Session.get(SELECTED_LOOKS);
		return Looks.find({
			$or: [
				{gender: 'both'},
				{gender: this.gender}
			]
		}).map(function(look){
			look.selected = _.contains(selected, look._id);
			look.images = LookImages.find({owner: look._id}).fetch();
			look.surprise = look.name === 'Surprise me!';
			return look;
		})
	},
	active: function(look){
		return look.currImage === this.i;
	},
	showPreview: function(){
		return Session.get(SHOW_PREVIEW);
	},
	preview: function(){
		return Session.get(PREVIEW);
	},
	valid: function(){
		return Session.get(SELECTED_LOOKS).length > 0;
	},
	isSurprise: function(){
		return this.name === 'Surprise me!';
	}/*,
	hoveredLook: function(){
		return Session.get(HOVERED_LOOK);
	}*/
})

function toggle(look){
	var selected = Session.get(SELECTED_LOOKS);
	if(_.contains(selected, look._id)){
		selected = _.without(selected, look._id);
	} else {
		selected.push(look._id);
	}
	Session.set(SELECTED_LOOKS, selected);
	Session.set(SHOW_PREVIEW, false);
}

Template.looks.events({/*
	'mouseenter .look-swatch': function(){
		Session.set(HOVERED_LOOK, this);
	},
	'mouseleave .look-swatch': function(){
		Session.set(HOVERED_LOOK, false);
	},*/
	'click .magnify': function(){
		Session.set(SHOW_PREVIEW, true);
		Session.set(PREVIEW, this);
	},
	'click .toggle-look': function(){
		toggle(this);
	},
	'click .hide-preview': function(){
		Session.set(SHOW_PREVIEW, false);
	},
	'click .done-button': function(event, template){
		Meteor.call('setLooks', template.data._id, Session.get(SELECTED_LOOKS), function(err, res){
			if(err) {
				alert(err.reason);
			} else {
				Router.go('/child/' + template.data._id);
			}
		})
	},
	'click .colors-link': function(event, template){
		Meteor.call('setLooks', template.data._id, Session.get(SELECTED_LOOKS), function(err, res){
			if(err) {
				alert(err.reason);
			} else {
				Router.go('/colors/' + template.data._id);
			}
		})
	}
})