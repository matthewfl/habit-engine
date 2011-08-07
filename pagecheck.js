function check (url, file) {
    if(url.exec(location.href)) {
	$('body').append('<div id="HABIT-ENGINE" style="display:none"></div>').append("<script src=\""+chrome.extension.getURL('jquery.js')+"\"></script>").append("<script src=\""+chrome.extension.getURL('inpage.js')+"\"></script>").append("<script src=\""chrome.extension.getURL('sites/'+file+'.js')+"\"></script>");
	document.getElementById('HABIT-ENGINE').addEventListener('HabitData', function () {
	    
	});
    }
}

check(/facebook\.com/, 'facebook');