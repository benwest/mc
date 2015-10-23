DPR = window.devicePixelRatio || 1;
CANVAS_RATIO = 210/297;
MONTHS = [];

(function(){
	
	var month;
	var mo = moment([2012, 0, 1]);
	
	for(var i = 0; i < 12; ++i){
		
		month = mo.month(i);
				
		MONTHS[i] = {
			name: mo.format('MMMM'),
			days: mo.daysInMonth()
		}
		
	}
		
})();