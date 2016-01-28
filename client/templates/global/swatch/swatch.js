Template.swatch.helpers({
	'bright': function(){
		if(this.bg) return !tinycolor.isReadable(this.color, COLORS[this.bg]) && 'bright';
		return tinycolor(this.color).getBrightness() > 150 && 'bright';
	}
});