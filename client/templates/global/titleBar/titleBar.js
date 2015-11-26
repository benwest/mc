var $body = $('html, body');

Template.titleBar.helpers({
	'sizeClass': function(){
		return this.text.length > 15 && 'right';
	}
})

Template.titleBar.events({
	'click .title-bar': function(){
		$body.animate({scrollTop: 0}, 200);
	}
})