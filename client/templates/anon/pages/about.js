var ANIMATION_START = 'aboutAnimationStart';

Template.about.onCreated(function(){
	Session.set(ANIMATION_START, false);
})

Template.about.onRendered(function(){
	var doc = $(document);
	var $demoUniverse = this.$('.demo-universe');
	$('.container').on('scroll.about', function(e){
		if( $demoUniverse.offset().top < window.innerHeight / 2 ) Session.set(ANIMATION_START, true);
	});
})

Template.about.onDestroyed(function(){
	$(window).off('.about');
})

Template.about.helpers({
    'demoUniverse': function(){
	    var ret = Session.equals(ANIMATION_START, true) ? DEMO_UNIVERSE : {shapes: []};
	    return ret;
    }
})

Template.about.events({
	'scroll': function(){
		console.log('hi');
	}
})