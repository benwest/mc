DPR = window.devicePixelRatio || 1;
MONTHS = [];

(function(){
	
	var month;
	var mo = moment([2012, 0, 1]);
	
	for(var i = 0; i < 12; ++i){
		
		month = mo.month(i);
				
		MONTHS[i] = {
			name: mo.format('MMMM'),
			days: mo.daysInMonth(),
			i: i
		}
		
	}
		
})();

COLORS = {
	PINK: '#e7bbb4',
	GREEN: '#9ba084',
	DARK_GREY: '#9c9c93',
	LIGHT_GREY: '#e2e2e2',
	ORANGE: '#EDA989',
	TEAL: '#ACD9D5',
	BLUE: '#9c9cd2'
}