var STAGE = 'orderFormStage';
var MAX_STAGE = 'orderFormMaxStage';
var GARMENTS = 'orderFormGarments';
var ADDRESS = 'orderFormAddress';

var STAGE_NAMES = ['garments', 'address', 'options', 'pay'];

Template.orderForm2.onCreated(function(){
	Session.setDefault(GARMENTS, []);
	Session.setDefault(MAX_STAGE, 0);
	Session.set(STAGE, Session.get(MAX_STAGE));
})

Template.orderForm2.helpers({
	title: function(){
		return "A new order for " + this.name;
	},
	bgClass: function(){
		return ['bg-blue', 'bg-orange', 'bg-teal', 'bg-green'][Session.get(STAGE)];
	},
	currStage: function(){
		return Session.get(STAGE);
	},
	maxStage: function(){
		return Session.get(MAX_STAGE);
	},
	currTemplate: function(){
		console.log('orderForm' + capitalise( STAGE_NAMES[Session.get(STAGE)] ));
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
		if(Session.get(MAX_STAGE) < 2) return;
		var repeat = Session.get('orderFormRepeat');
		var interval = Session.get('orderFormRepeatInterval');
		if(repeat && !interval) return;
		var ret = Session.get('orderFormOrganic') ? 'Organic products' : 'Any products';
		ret += '<br>';
		ret += Session.get('orderFormRepeat') ? 'Every ' + Session.get('orderFormRepeatInterval') : 'One-off';
		return ret;
	}
})

function setStage(to){
	console.log(to);
	if(to <= Session.get(MAX_STAGE) && !Session.equals(STAGE, to)) Session.set(STAGE, to);
}

Template.orderForm2.events({
	'click .stage-0': function(event, template){ setStage(0) },
	'click .stage-1': function(event, template){ setStage(1) },
	'click .stage-2': function(event, template){ setStage(2) },
	'click .stage-3': function(event, template){ setStage(3) }
})