var SHORT_LIST = 12;

function updateLines(template){
	Meteor.call('sqlOrderLines', template.data, function(err, res){
		if(err) {
			console.log(err);
		} else {
			template.i2iOrderLines.set(_.map(res, function(line){
			    return {
				    name: line.SODetDes,
				    quantity: line.SODetQty,
				    lineNumber: line.SODetLineNum,
				    price: line.SODetUnitNetIncMargin,
				    confirmedReturned: line.UD15,
				    confirmedReturnReason: line.UD14,
				    markedForReturnId: 'returnMarked' + line.SODetLineNum,
				    returnQtyId: 'returnQty' + line.SODetLineNum,
				    returnReasonId: 'returnReason' + line.SODetLineNum,
				    returnReasonDetailId: 'returnReasonDetail' + line.SODetLineNum
			    }
		    }));
		    template.more.set(Math.max(res.length - SHORT_LIST, 0));
		}
	});
	
}

Template.orderItemList.onCreated(function(){
	
	Template.orderItemList.uihooks({
		'.order-item': {
			container: '.order-item-list',
			insert: function(node, next){
				$(node).insertBefore(next).slideUp(0).slideDown().addClass('border-bottom');
			},
			remove: function(node, next){
				var $node = $(node);
				$node.removeClass('border-bottom').slideUp({
					complete: function(){
						$node.remove();
					}
				});
			}
		}
	})
	
	this.i2iOrderLines = new ReactiveVar([]);
	updateLines(this);
	this.expanded = new ReactiveVar(false);
	this.more = new ReactiveVar(0);
	
});

Template.orderItemList.uihooks({
	'.order-item': {
		container: '.order-item-list',
		insert: function(node, next){
			console.log(node);
			$(node).insertBefore(next).slideUp(0).slideDown().addClass('border-bottom');
		},
		remove: function(node, next){
			console.log(node);
			var $node = $(node);
			$node.removeClass('border-bottom').slideUp({
				complete: function(){
					$node.remove();
				}
			});
		}
	}
})

Template.orderItemList.helpers({
	
	sqlOrderLines: function(){
		
		var instance = Template.instance();
		
	    var lines = instance.i2iOrderLines.get();
	    
	    if(!lines.length) return false;
	    
	    var expanded = instance.expanded.get();
	    
	    if(!expanded) lines = lines.slice(0,SHORT_LIST);
	    
		return lines;
		
	},
	
	expanded: function(){
		
		return Template.instance().expanded.get();
		
	},
	
	more: function(){
		return Template.instance().more.get();
	}
	
})

Template.orderItemList.events({
	'click .expand': function(event, template){
		
		template.expanded.set( !template.expanded.get() )
		
	}
})