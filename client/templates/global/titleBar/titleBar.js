Template.titleBar.helpers({
	'sizeClass': function(){
		if(!this.text) return;
		return this.text.length > 15 && 'right';
	}
})