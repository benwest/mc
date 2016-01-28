Inject.rawModHtml('ieDoctype', function(html, res){
	return html.replace('<!DOCTYPE html>', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">');
})

Inject.rawHead('ie8Css', '<!--[if IE lte 10]><link rel="stylesheet" type="text/css" href="/blockIE.css" /><[endif]-->');