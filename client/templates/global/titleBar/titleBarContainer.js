var $body = $('html, body');

Template.titleBarContainer.helpers({
	'sizeClass': function(){
		if(!this.text) return;
		return this.text.length > 15 && 'right';
	}
})

Template.titleBarContainer.events({
	'click .title-bar': function(){
		$body.animate({scrollTop: 0}, 200);
	}
})