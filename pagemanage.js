//alert(location.href);

var port = chrome.extension.connect({name: location.href});
port.onMessage.addListener(function (msg) {
    if(msg.action) {
	alert("doing: "+msg.action);
    }
});
/*
$("body").append("<h1>test</h1>");
alert('this is running');


// check if there is special code to be loaded directly into the page
function check (url, file) {
    if(url.exec(location.href)) {
	$('body').append('<div id="HABIT-ENGINE" style="display:none"></div>').append("<script src=\""+chrome.extension.getURL('jquery.js')+"\"></script>").append("<script src=\""+chrome.extension.getURL('inpage.js')+"\"></script>").append("<script src=\""chrome.extension.getURL('sites/'+file+'.js')+"\"></script>");
	document.getElementById('HABIT-ENGINE').addEventListener('HabitData', function () {
	    
	});
    }
}

//check(/facebook\.com/, 'facebook');
*/