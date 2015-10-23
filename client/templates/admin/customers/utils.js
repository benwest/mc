var allNotifsFactory = function(funcs){
    return function(thing){
        return (
            _.chain(funcs)
                .map(function(func){
                    return func(thing);
                })
                .filter(function(notif){
                    return notif;
                })
                .value()
        )
    }
}

var counterFactory = function(funcs){
    return function(thing){
        return _.filter(funcs, function(func){
            return func(thing);
        }).length;
    }
}


// Items

itemWaitingForReturn = function(item){
    return (
        item.markedForReturn < item.returned &&
        'Waiting for return'
    )
}

var itemNotificationFuncs = [itemWaitingForReturn];
itemNotificationsCount = counterFactory(itemNotificationFuncs);
allItemNotifications = allNotifsFactory(itemNotificationFuncs);


itemReturnDue = function(item){
    return (
        itemWaitingForReturn(item) &&
        item.returnDue.time() > Date.now() &&
        'Return due'
    )
}

var itemWarningFuncs = [/*itemReturnDue*/];
itemWarningsCount = counterFactory(itemWarningFuncs);
allItemWarnings = allNotifsFactory(itemWarningFuncs);



//Orders

orderNeedsDispatch = function(order){
    
    return (
        order.status === 'placed' &&
        !orderNeedsItems(order) &&
        !orderNeedsDeliveryDate(order) &&
        'Waiting for dispatch'
    )
    
}

orderHasItemNotifications = function(order){
    return (
        _.some(OrderItems.find({order: order._id}).fetch(), function(item){ return itemNotificationsCount(item) }) &&
        'Items need attention'
    )
}

var orderNotificationFuncs = [orderNeedsDispatch, orderHasItemNotifications];
orderNotificationCount = counterFactory(orderNotificationFuncs);
allOrderNotifications = allNotifsFactory(orderNotificationFuncs);


orderNeedsItems = function(order){
    return (
        order.status === 'placed' &&
        OrderItems.find({order: order._id}).count() === 0 &&
        'Needs items'
    )
}

orderNeedsDeliveryDate = function(order){
    return (
        order.status === 'placed' &&
        OrderItems.find({order: order._id}).count() > 0 &&
        !order.estimatedDelivery &&
        'Needs delivery date'
    )
}

orderNeedsCompleting = function(order){
    return (
        order.status === 'dispatched' &&
        _.every(OrderItems.find({order: order._id}).fetch(), function(item){ return item.markedForReturn === item.returned }) &&
        order.returnBy.getTime() < Date.now() &&
        'Needs completing'
    )
    
}

orderHasItemWarnings = function(order){
    return (
        _.some(OrderItems.find({order: order._id}).fetch(), function(item){ return itemWarningsCount(item) }) &&
        'Items have problems'
    )
}

var orderWarningFuncs = [orderNeedsItems, orderNeedsDeliveryDate, orderNeedsCompleting, orderHasItemWarnings];
orderWarningCount = counterFactory(orderWarningFuncs);
allOrderWarnings = allNotifsFactory(orderWarningFuncs);

childNotificationCount = function(child){
    return _.reduce(Orders.find({owner: child._id}).fetch(), function(memo, order){
        return memo + orderNotificationCount(order);
    }, 0);
}

childWarningCount = function(child){
    return _.reduce(Orders.find({forChild: child._id}).fetch(), function(memo, order){
        return memo + orderWarningCount(order);
    }, 0);
}

customerNotificationCount = function(customer){
    return _.reduce(Orders.find({owner: customer._id}).fetch(), function(memo, order){
        return memo + orderNotificationCount(order);
    }, 0);
}

customerWarningCount = function(customer){
    return _.reduce(Orders.find({owner: customer._id}).fetch(), function(memo, order){
        return memo + orderWarningCount(order);
    }, 0);
}

allNotificationCount = function(){
    return _.reduce(Orders.find().fetch(), function(memo, order){
        return memo + orderNotificationCount(order);
    }, 0);
}

allWarningCount = function(){
    return _.reduce(Orders.find().fetch(), function(memo, order){
        return memo + orderWarningCount(order);
    }, 0);
}