var ERRORS = 'returnErrors';
var CONFIRMING_RETURN = 'confirmingReturn';
var COURIER_SELECTED = 'courierSelected';
var RETURN = 'return';

Template.order.onCreated(function(){
	Session.set('back', '/orders/');
	Session.set(ERRORS, false);
	Session.set(CONFIRMING_RETURN, false);
	Session.set(COURIER_SELECTED, false);
	var template = this;
	template.i2iOrderHeader = new ReactiveVar(null);
	Meteor.call('sqlOrderHeader', template.data, function(err, res){
		if(err) {
			console.log(err);
		} else {
			if(res.length){
				template.i2iOrderHeader.set(res[0]);
			} else {
				template.i2iOrderHeader.set(false);
			}
		}
	})
	template.i2iOrderDispatch = new ReactiveVar(false);
	Meteor.call('sqlOrderDispatch', template.data, function(err, res){
		if(err) {
			console.log(err);
		} else {
			template.i2iOrderDispatch.set(res[0]);
		}
	})
})

Template.order.onDestroyed(function(){
	Session.set('back', false);
})

var RETURN_REASONS = [
	{
		label: "It's not my style"
	},{
		label: "It's too expensive"
	},{
		label: "It's too small"
	},{
		label: "It's too big"
	},{
		label: "I want to exchange it",
		field: 'With what?'
	},{
		label: "It's poor quality or faulty"
	},{
		label: 'Other',
		field: 'Tell us why'
	}
]

Template.order.helpers({
    
    'title': function(){
        return posessive(Children.findOne(this.forChild).name) + " Order";
    },
    
    'sqlOrderStatus': function(){
	        
		return i2iStatusDescription(Template.instance());
		
    },
    
    'dispatchDate': function(){
	    
	    var date = Template.instance().i2iOrderDispatch.get();
	    	    
	    if(date && date.length) return date[0];
	    
    },
        
    'numReturns': function(confirmed){
	    return _.reduce(this, function(memo, line){
		    var returnQty = confirmed ? line.confirmedReturned : Session.get('returnQty' + line.lineNumber);
		    if(returnQty){
			    return memo + Number(returnQty);
		    } else {
			    return memo;
		    }
		}, 0)
    },
    
    'courierSelectClass': function(name){
	    var courier = Session.get(COURIER_SELECTED);
	    console.log(courier);
		if(courier === false){
			return '';
		} else if(courier === name){
			return 'selected';
		} else {
			return 'not-selected';
		}
    },
    
    'forChild': function(){
	    return Children.findOne(this.forChild).name;
    },
    
    'lastActionTime': function(){    
	    return moment(this[this.status + 'At']).format('H[:]MM [on] MMMM Do YYYY');
    },    
    'colors': function(){  
	    return _.map(this.colors, function(id){
		    return Colors.findOne(id)
	    })
    },
    'looks': function(){  
	    return _.map(this.looks, function(id){
		    return Looks.findOne(id)
	    })
    },
    
    'returnOptions': function(){
	    return _.pluck(RETURN_REASONS, 'label').join(', ');
    },
    
    'returnOptionsDetail': function(){
	    var chosenReason = Session.get('returnReason' + this.lineNumber);
	    var chosenReasonObj = _.find(RETURN_REASONS, function(reason){
		    return reason.label === chosenReason && reason.field;
	    })
	    if(chosenReasonObj) return chosenReasonObj.field;
    },
    
    'errors': function(){
	    return Session.get(ERRORS);
    },
    
    'returnEditable': function(){
	    return !this.returnConfirmed && !Session.get(CONFIRMING_RETURN);
    },
    
    'courierSelected': function(){
	    return Session.get(COURIER_SELECTED);
    }
    
});

Template.order.events({
	'click .return-item': function(event, template){
		
		if(Session.get(this.markedForReturnId)){
			Session.set(this.markedForReturnId, false);
			Session.set(this.returnQtyId, 0);
		} else {
			Session.set(this.markedForReturnId, true);
		}
	
	},

	'click .confirm-returns': function(event, template){
		
		var errors = [];
		
		var items = _.map(this, function(item){
			
			var returnObj = {lineNumber: item.lineNumber};
			
			var markedforReturn = Session.get(item.markedForReturnId);
			
			if(markedforReturn){
				
				returnObj.returnedQty = Session.get(item.returnQtyId);
				if(!returnObj.returnedQty) errors.push('Please let us know how many of each item you want to return.')
				returnObj.returnedQty = Number(returnObj.returnedQty);
				
				returnObj.returnReason = Session.get(item.returnReasonId);
				if(!returnObj.returnReason) errors.push("Please let us know why you're returning each item.")
				var returnDetail = Session.get(item.returnReasonDetailId);
				console.log(item.returnReasonDetailId);
				if(returnDetail) returnObj.returnReason += ' - ' + returnDetail;
				
				if(returnObj.returnedQty > item.quantity) errors.push("You can't return more of an item than you were sent.")
				
			} else {
				
				returnObj.returnedQty = 0;
				returnObj.returnReason = '';
				
			}			
			
			return returnObj;
			
		})
		
		errors = _.uniq(errors);
		
		Session.set(ERRORS, errors);
		
		if(errors.length){
			return;
		}
		
		console.log(items);
		
		Session.set(RETURN, items);
		Session.set(CONFIRMING_RETURN, true);
		
	},
	
	'click .select-none': function(event, template){
		
		Session.set(COURIER_SELECTED, 'No courier');
		
	},
	
	'click .select-interlink': function(event, template){
		
		Session.set(COURIER_SELECTED, 'Interlink Express');
		
	},
	
	'click .select-collect': function(event, template){
		
		Session.set(COURIER_SELECTED, 'Collect+');
		
	},
	
	'click .cancel-confirm': function(){
		
		Session.set(RETURN, false);
		Session.set(COURIER_SELECTED, false);
		Session.set(CONFIRMING_RETURN, false);
		
	},
	
	'click .send-return': function(event, template){
		
		var feedback = template.$('textarea').val();
		
		var courier = Session.get(COURIER_SELECTED);
				
		feedback = feedback.replace("'", "");
		
		Meteor.call('sendReturn', template.data._id, feedback, courier, function(err, res){
			
			if(err){
				Session.set(ERRORS, [err.reason]);
			} else {
				Session.set(CONFIRMING_RETURN, false);
				updateLines(template);
			}
			
		});
		
	}
	
})