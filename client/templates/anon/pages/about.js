var ANIMATION_START = 'aboutAnimationStart';

Template.about.onCreated(function(){
	Session.set(ANIMATION_START, false);
})

Template.about.onRendered(function(){
	var doc = $(document);
	var $demoUniverse = this.$('.demo-universe');
	doc.on('scroll.about', function(e){
		if( doc.scrollTop() > $demoUniverse.offset().top - window.innerHeight / 2 ) {
			Session.set(ANIMATION_START, true);
			doc.off('scroll.about');
		}
	});
	
	Physics(function( world ) {

		var viewWidth = window.innerWidth;
		var viewHeight = window.innerHeight * .9;
		var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		var edgeBounce;
				
		var renderer = Physics.renderer('pixi', {
		    el: 'physics-canvas',
		    width: viewWidth,
		    height: viewHeight
		});
		
		renderer.container.style.width = renderer.el.clientWidth;
		renderer.container.style.height = renderer.el.style.height = viewHeight + 'px';
						
		world.add( renderer );
		
		var prefix = '/img/brands/';
		var extension = '.svg';
		var brands = 'angulus, joha, lol, mads, marmar, minirodini, mp, petitecrabe, poppyrose, popupshop, softgallery, wheat';
		var logos = _.map(brands.split(', '), function(brand){
			return prefix + brand + extension;
		});
		logos = _.shuffle(logos);

		var spacing = viewWidth / logos.length;
		var size = Math.max(viewWidth, viewHeight) / (logos.length * 1);
				
		var circles = []
		for(i = 0; i < logos.length; i++) {
			var circle =  Physics.body('circle', {
			  	x: spacing * i,
			    y: 0,
			    vx: -0.02,
			    radius: size
			});
			
			circle.view = renderer.createDisplay('sprite', {
				texture: logos[i],
				anchor: {
					x: 0.5,
					y: 0.5
				}
			})
			
			circle.view.scale.x *= size / 100;
			circle.view.scale.y *= size / 100;
			
			circles.push(circle);
			
		}

		world.add( circles );

		world.render();
		
		Physics.util.ticker.on(function( time, dt ){
			world.step( time ); 
		});
		
		Physics.util.ticker.start();

		world.on('step', function(){
			world.render();
		});
		
		world.add( Physics.behavior('constant-acceleration') );

		edgeBounce = Physics.behavior('edge-collision-detection', {
			aabb: viewportBounds,
			restitution: 0.3
		});

		window.addEventListener('resize', function () {
			viewWidth = window.innerWidth;
			viewHeight = window.innerHeight * .9;
			renderer.container.style.width = renderer.el.style.width = viewWidth + 'px';
			renderer.container.style.height = renderer.el.style.height = viewHeight + 'px';
			viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
	    	edgeBounce.setAABB(viewportBounds);
		}, true);
		
		world.add( Physics.behavior('body-impulse-response'));
		world.add( Physics.behavior('body-collision-detection'));
		world.add( Physics.behavior('sweep-prune')); //optimisation
		world.add( edgeBounce );
		/*
		world.on('interact:move', function(data){
			renderer.el.style.cursor = world.findOne({$at: data}) ? 'pointer' : 'inherit';
		})
	  	*/	  	
		world.add(Physics.behavior('interactive', {
			el: "physics-canvas"
		}));


	});
	
	var messageTimer;
	
	function buttonMessage(message){
		clearTimeout(messageTimer);
		$('.submit').html(message);
		messageTimer = setTimeout(function(){
			$('.submit').text('Submit');
		}, 2000);
	}
		
	$('.mc-form').ajaxChimp({
	    url: '//muddycreatures.us11.list-manage.com/subscribe/post?u=2e377c9cf27bf51f14250661b&amp;id=ae733fe0de',
	    callback: function(r){
		    console.log(r);
            if(r.result === 'success'){
                buttonMessage('&#9786;')
            } else {
                buttonMessage('&times;')
        	}
            $('.error').text(r.msg).addClass('active');
        }
    });

})

Template.about.onDestroyed(function(){
	$(window).off('.about');
	Physics.util.ticker.stop();	
})

Template.about.helpers({
    'demoUniverse': function(){
	    var ret = Session.equals(ANIMATION_START, true) ? demoUniverse() : {shapes: []};
	    return ret;
    }
})

Template.about.events({
	'scroll': function(){
		console.log('hi');
	}
})