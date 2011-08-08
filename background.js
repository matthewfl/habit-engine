//alert(chrome.extension.getURL('inpage.js'));

var pages = {};

chrome.extension.onConnect.addListener(function (port) {
    console.log(port);
    port.onMessage.addListener(function (msg) {
	if(msg.change) {
	    var e = pages[port.name].change(msg.type, msg.name, msg.change);
	    if(e) {
		port.postMessage({action: e});
	    }
	}
	if(msg.event) {
	    pages[port.name].event(msg.event);
	}
    });
});