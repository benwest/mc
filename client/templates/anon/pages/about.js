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
		var viewHeight = window.innerHeight - (window.innerHeight/10);
		var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight);
		var edgeBounce;
		var colors = ['0xEDA989', '0xFFFFFF', '0xFFFFFF'];

		var styles = {
	      'circle': {
	        fillStyle: colors[1],
	        lineWidth: 0,
	        strokeStyle: colors[0]
	      }
	      ,'rectangle': {
	        fillStyle: colors[1],
	      }
	      ,'convex-polygon': {
	        fillStyle: colors[0],
	      }
	    }


		// Setting da renderer
		var renderer = Physics.renderer('pixi', {
		    el: 'phyics-canvas', // id of the canvas element
		    width: viewWidth,
		    height: viewHeight,
		    styles: styles
		});
		world.add( renderer );


		var logos = ['/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg','/img/brands/logo_1.svg','/img/brands/logo_2.svg','/img/brands/logo_3.svg','/img/brands/logo_4.svg']
		var spacing = viewWidth / logos.length;


		var spheres = []
		for(i = 0; i < logos.length; i++) {
			sphere =  Physics.body('circle', {
			  	x: spacing * i,
			    y: 0,
			    vx: -0.02,
			    radius: 100
			});

			sphere.view = renderer.createDisplay('sprite', {
				texture: logos[i],
				anchor: {
					x: 0.5,
					y: 0.5
				},
				scale: {
					x: 1,
					y: 1
				}
			})

			console.log(sphere.view);
			spheres.push(sphere);
			
		}

		world.add( spheres );


		world.render();


		// Ticker 
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
			restitution: 0.3 // gradually slows momentum
		});

		window.addEventListener('resize', function () {
	   		viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
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