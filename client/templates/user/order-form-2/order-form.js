var STAGE = 'orderFormStage';
var MAX_STAGE = 'orderFormMaxStage';
var GARMENTS = 'orderFormGarments';
var ORGANIC = 'orderFormOrganic';
var REPEAT = 'orderFormRepeat';
var COMMENTS = 'orderFormComments';
var REPEAT_INTERVAL = 'orderFormRepeatInterval';
var ADDRESS = 'orderFormAddress';

Template.orderForm2.onCreated(function(){
	Session.set('back', '/child/' + this.data._id);
	Session.set(GARMENTS, []);
	Session.set(ADDRESS, false);
	Session.set(REPEAT, false);
	Session.set(REPEAT_INTERVAL, false);
	Session.set(ORGANIC, false);
	Session.set(COMMENTS, '');
	Session.set(MAX_STAGE, 0);
	Session.set(STAGE, 0);
})

Template.orderForm2.onDestroyed(function(){
	Session.set('back', false);
})

Template.orderForm2.helpers({
	title: function(){
		return "A box of joy for " + this.name;
	},
	stageClasses: function(i){
		var stage = STAGE_NAMES[i];
		var classes = [];
		if(Session.get(STAGE) === i) classes.push('active');
		if(orderFormValidators[stage]()) classes.push('valid');
		if(Session.get(MAX_STAGE) >= i) classes.push('visited');
		if(orderFormVisitable(i)) classes.push('visitable');
		return classes.join(' ');
	},
	currTemplate: function(){
		return 'orderForm' + capitalise( STAGE_NAMES[Session.get(STAGE)] );
	},
	chosenGarments: function(){
		return Session.get(GARMENTS);
	},
	chosenGarmentsList: function(){
		var names = _.pluck(Session.get(GARMENTS), 'name');
		if(names.length === 0){
			return;
		} if(names.length === 1){
			return names[0];
		} else if(names.length <= 5){
			return names.splice(0, names.length - 1).join(', ') + ' & ' + _.last(names);
		} else {
			return names.splice(0, 5).join(', ') + '...';
		}
	},
	chosenAddress: function(){
		if(Session.get(MAX_STAGE) < 1) return;
		var id = Session.get(ADDRESS)
		if(!id) return;
		var address = Addresses.findOne(id);
		if(!address) return;
		return address.line1 + '<br>' + address.city;
	},
	chosenOptions: function(){
		if(Session.get(MAX_STAGE) < 1) return;
		var repeat = Session.get('orderFormRepeat');
		var interval = Session.get('orderFormRepeatInterval');
		if(repeat && !interval) return;
		var ret = Session.get('orderFormOrganic') ? 'Organic products' : 'Any products';
		ret += '<br>';
		ret += Session.get('orderFormRepeat') ? 'Every ' + Session.get('orderFormRepeatInterval') : 'One-off';
		return ret;
	}
})

Template.orderForm2.events({
	'click .stage-0': function(event, template){ orderFormSetStage(0) },
	'click .stage-1': function(event, template){ orderFormSetStage(1) },
	'click .stage-2': function(event, template){ orderFormSetStage(2) },
	'click .stage-3': function(event, template){ orderFormSetStage(3) }
})