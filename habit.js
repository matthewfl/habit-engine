/*
 * This is the core habit engine, it takes events and environments, and maps them together
 * 
 * states are contained in the this.states variable
 ** absolute states are states that MUST match for an event to happen
 ** range states are for numuric vaules that are approximate, such a scroll location
 ** string states are for values of search boxes, or text feilds, it uses a bayes net
 ** helps is for values that do a direct match, but if they are different, will not prohibit the event from happening
 */


function Habit (data, state) {
    this.data = data || {};
    this.state=state || {
	absolute: {},
	range: {},
	string: {},
	helps: {}
    };
    this.code_source="";
    this.func=function () {};
    this.trigged=function (name) {};
    this.compute();
}

Habit.prototype.compute = function () {
    var cases = {};
    var stringdat={};
    for(var event in this.data) {
	if(this.data[event].length > 10) {
	    var dat={
		absolute: {},
		range: {},
		string: {},
		helps: {}
	    };
	    for(var i=0,a=this.data[event].length;i<a;i++) {
		var work = this.data[event][i];
		// first process the absolute data because this is easy to deal with
		for(var n in work.absolute) {
		    if(!dat.absolute[n])
			dat.absolute[n]=[work.absolute[n]];
		    else if(dat.absolute.indexOf(work.absolute[n])==-1)
			dat.absolute[n].push(work.absolute[n]);
		}
		// basically the same as absolute, as we just want all possible cases
		for(var n in work.helps) {
		    if(!dat.helps[n])
			dat.helps[n]=[work.helps[n]];
		    else if(dat.helps.indexOf(work.helps[n])==-1)
			dat.helps[n].push(work.helps[n]);
		}
		// this is for the range detect
		// this sould find the max, min, avg, and standard deviation
		for(var n in work.range) {
		    if(!dat.range[n])
			dat.range[n]={max: -1.7976E+10308, min: 1.7976E+10308, sum: 0, dev:0, values:[]};
		    dat.range[n].sum += work.range[n];
		    dat.range[n].count.push(work.range[n]);
		    if(dat.range[n].max < work.range[n])
			dat.range[n].max = work.range[n];
		    if(dat.range[n].min > work.range[n])
			dat.range[n].min = work.range[n];
		}
		// process the string based data
		for(var n in work.string) {
		    var sp = work.string[n].replace(/[^A-Za-z0-9]/g, " ").split(" ");
		    
		}
	    }
	    // finish up the standard deivation
	    for(var n in dat.range) {
		dat.range[n].avg=dat.range[n].sum/dat.range[n].values.length;
		var dif=0;
		for(var b=0,c=dat.range[n].values.length;b<c;b++) {
		    dif=Math.pow(dat.range[n].values[b]-dat.range,2);
		}
		dif/=dat.range[n].values.length;
		dat.range[n].dev=Math.sqrt(dif);
	    }
	    cases[event]=dat;
	}
    }
};

Habit.prototype.Action = function () {
    // return a possible action to take
    var data = this.func(this.state);
    
};

Habit.prototype.change = function (type, name, value) {
    switch(type) {
    case 1:
    case "absolute":
	this.state.absolute[name]=value;
	break;
    case 2:
    case "range":
	this.state.range[name]=value;
	break;
    case 3:
    case "string":
	this.state.string[name]=value;
	break;
    case 4:
    case "helps":
	this.state.helps[name]=value;
	break;
    }
    var chance = this.func(this.state);
    
};

Habit.prototype.event = function (name) {
    if(typeof this.data[name] == "undefined")
	this.data[name]=[];
    this.data[name].push(this.state);
};

Habit.prototype.addData = function (data) {
    for(var n in data) {
	if(this.data[n])
	    this.data[n] = data[n].concat(this.data[n]);
	else
	    this.data[n] = data[n];
    }
};