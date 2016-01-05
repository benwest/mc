$.Velocity.RegisterEffect('transition.slideDown100In', {
	defaultDuration: 1000,
	calls: [
		[{translateY: ['0%', '-100%'], translateZ: 0, easing: 'ease-in-out', opacity: [1,1]}]
	]
})

$.Velocity.RegisterEffect('transition.slideDown100Out', {
	defaultDuration: 1000,
	calls: [
		[{translateY: ['100%', '0%'], translateZ: 0, easing: 'ease-in-out', opacity: [1,1]}]
	]
})

$.Velocity.RegisterEffect('transition.slideUp100In', {
	defaultDuration: 1000,
	calls: [
		[{translateY: ['0%', '100%'], translateZ: 0, easing: 'ease-in-out', opacity: [1,1]}]
	]
})

$.Velocity.RegisterEffect('transition.slideUp100Out', {
	defaultDuration: 1000,
	calls: [
		[{translateY: ['-100%', '0%'], translateZ: 0, easing: 'ease-in-out', opacity: [1,1]}]
	]
})

Transitioner.transition({
	fromRoute: 'profile',
	toRoute: 'child',
	velocityAnimation: {
		in: 'transition.slideDown100In',
		out: 'transition.slideDown100Out'
	}
});


Transitioner.transition({
	fromRoute: 'child',
	toRoute: 'profile',
	velocityAnimation: {
		in: 'transition.slideUp100In',
		out: 'transition.slideUp100Out'
	}
});

Transitioner.default({
	in: 'transition.fadeIn',
	out: 'transition.fadeOut'
});