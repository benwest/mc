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
		
		renderer.container.style.width = renderer.el.style.width = viewWidth + 'px';
		renderer.container.style.height = renderer.el.style.height = viewHeight + 'px';
						
		world.add( renderer );

		var logos = ['/img/brands/logo_1.svg'/*,'/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg'*/]
		var spacing = viewWidth / logos.length;
		var size = 100 // Math.max(viewWidth, viewHeight) / (logos.length * 0.9);
				
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
	  		  	
		world.add(Physics.behavior('interactive', {
			el: "physics-canvas"
		}));


	});

})

Template.about.onDestroyed(function(){
	$(window).off('.about');
	Physics.util.ticker.stop();	
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