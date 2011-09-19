
var name = location.host.replace(/[0-9]+\./g, '.').replace(/^www\./, '');
var port = chrome.extension.connect({name: name});
port.onMessage.addListener(function (msg) {
    if(msg.action) {
	alert("doing: "+msg.action);
    }
});

function change (type, name, value) {
    port.postMessage({
	change: value,
	type: type,
	name: name
    });
}
// do not recompute the habit state
// call this first if you are going to pass a few different state changes to the system
function update (type, name, value) {
    port.postMessage({
	update: value,
	type: type,
	name: name
    });
    
}

// some pages are very long lived, so we want to be able to update them with date changes
setInterval(function () {
    update(2, "WeekDay", (new Date).getDay()); // this might be better as a week hour or something that a range will work well one
    update(2, "YearDay", Math.ceil(((new Date) - (new Date((new Date).getFullYear(),0,1))) / 86400000));
}, 1000*3600);
update(2, "WeekDay", (new Date).getDay());
update(2, "YearDay", Math.ceil(((new Date) - (new Date((new Date).getFullYear(),0,1))) / 86400000));

		
setInterval(function () {
    // map to a 24 hour period
    change(2, "Seconds", (Date.now()/1000)%(3600*24));
}, 500);

$(function () {
    $("a").live('click', function () {
	
    });
    $(document).mousemove(_.throttle(function (e) {
	update(2, "mouseX", e.pageX);
	change(2, "mouseY", e.pageY);
    }, 75))
	.scroll(_.throttle(function (e) {
	    var s = $(document).scrollTop();
	    update(2, "scrollTop", s);
	    change(2, "scrollBottom", $(document).height() - s);
	}, 75));
});


// check if there is special code to be loaded directly into the page
function check (url, file) {
    if(url.exec(location.href)) {
	$("body").append(
	    "<div id='habit-engine' style='display:none;'></div>"
		+ "<script src=\""+chrome.extension.getURL('jquery.js')+"\"></script>"
		+ "<script src=\""+chrome.extension.getURL('inpage.js')+"\"></script>"
		+ "<script src=\""+chrome.extension.getURL('sites/'+file+'.js')+"\"></script>"
		
	);
    }
}

//check(/facebook\.com/, 'facebook');