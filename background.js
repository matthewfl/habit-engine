//alert(chrome.extension.getURL('inpage.js'));

var pages = {};

chrome.extension.onConnect.addListener(function (port) {
    console.log(port);
    if(typeof pages[port.name] == "undefined") {
	pages[port.name] = new Habit;
    }
    port.onMessage.addListener(function (msg) {
	if(msg.update) {
	    pages[port.name].update(msg.type, msg.name, msg.update);
	}
	if(msg.change) {
	    var e = pages[port.name].change(msg.type, msg.name, msg.change);
	    if(e) {
		port.postMessage({action: e});
	    }
	}
	if(msg.event) {
	    console.log(msg);
	    pages[port.name].event(msg.event);
	}
    });
});