var alert = function (element) {
	console.log (element);
};

var jEach = function (list, iterator) {
	if (typeof list === 'object') {
		for (var key in list) {
			var value = list[key];
			iterator(value, key, list);
		}	
	} else if (typeof list === 'array') {
		var element = list[i], index = i;
		for (var i = 0; i < list.length; i++) {
			iterator(element, index, list);
		} 
	} else {
		throw new TypeError("this is null or not defined");
	}
};

var jEachReverse = function (list, iterator) {
	if (typeof list === 'object') {
		for (var key in list) {
			var value = list[key];
			iterator(value, key, list);
		}	
	} else if (typeof list === 'array') {
		var element = list[i], index = i;
		for (var i = list.length-1; i > 0; i--) {
			iterator(element, index, list);
		} 
	} else {
		throw new TypeError("this is null or not defined");
	}
};

var jMap = function (list, iterator) {
	var resArr = [];
	jEach(list, function (element, index, list){
			resArr.push(iterator(element));
	});
	console.log(resArr);
}


var jReduce = function(list, iterator, memo) {
	jEach(list, function (element, index, list){
		memo = iterator(memo, element, index, list);
	});
	return memo;
};

var red = function (list, callback, memo) {
	jEach(list, function (element, index, list) {
		memo = callback(memo, element, index, list);
	});
			return memo;
}



var jFind = function (list, predicate) {
	var a; 
	jEachReverse(list, function(element, index, list){
		if (predicate(element) == true) {
			return a = element;
		}
	});
	return a;
}; //not finding first true value

var jFilter = function (list, predicate) {
	var a = [];
	jEach(list, function(element, index, list){
		if (predicate(element) == true) {
			a.push(element);
		}
	});
	return a;
};

var jReject = function (list, predicate) {
	var a = [];
	jEach(list, function (element, index, list){
		if (predicate(element) == false) {
			a.push(element); 
		}
	});
	return a;
};

var jEvery = function (list, predicate) {
	var a = [];
	jEach(list, function (element, index, list){
		if (predicate(element) == true) {
			a.push(element);
		}
	});
	if (a.length == list.length) {
		return true;
	} else {
		return false;
	}
};

var jSome = function (list, predicate) {
	var res;
	jEvery(list, function (element, index, list){
		if (predicate(element) == true) {
			return res = true;
		} else {
			return res = false;
		}
	});
	return res;
};

var jContains = function (list, value) {
	var buffer = value;
	jEach(list, function(element, index, list){

	});
};

var jInvoke = function (list, methodName) {
	var fnstring = methodName;
	var fn = window[fnstring];
	console.log(window[fnstring]);

	if (typeof fn == "function") {
		jEach(list, function(element, index, list) {
			fn(element);
		});
	}
};

var jPluck = function (list, propertyName) {
	var res = [];
	jEach(list, function (element, index, list) {
		for (var key in element) {
			if (key == propertyName) {
				res.push(element[key]);
			}
		}
	});
	return res;
};

var jWhere = function (list, properties) {
	var arr = [], memo;
	jEach(list, function (element, index, list) {
		jEach(properties, function (value, key, list) {
			if (element[key] == value) {
				arr.push(element);
			}
		})
	});
	return arr;
};

//max([{age: 10},{age: 15}], function (obj) { return obj.age });
var max = function (list, iterator, context) {
	jEach(list, function (element, i, list) {
		jEach(element, function (value, key, element) {
			console.log(value); //10,15
		});
	});
};


//-------skipped--------//
/*
var jreduceRight = function (list, iterator, memo) {

};

var jWhere = function (list, properties) {
	var a = [];
	jEach(list, function(element, index, list){

	});
};

var jFindWhere = function (list, properties) {};
*/
