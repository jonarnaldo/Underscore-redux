var slice = Array.prototype.slice;

var flatten = function(arr) {
	var resArr = [];
	each(arr, function (element) {
		if (!(element instanceof Array)) {
			resArr.push(element);
		} else {
			resArr = arr.concat(flatten(element));
		}
	});
	return resArr;
};

var each = function (list, iterator) {
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

var eachReverse = function (list, iterator) {
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
	each(list, function (element, index, list){
			resArr.push(iterator(element));
	});
	console.log(resArr);
};


var jReduce = function(list, iterator, memo) {
	each(list, function (element, index, list){
		memo = iterator(memo, element, index, list);
	});
	return memo;
};

var red = function (list, callback, memo) {
	each(list, function (element, index, list) {
		memo = callback(memo, element, index, list);
	});
			return memo;
};



var jFind = function (list, predicate) {
	var a; 
	eachReverse(list, function(element, index, list){
		if (predicate(element) === true) {
			a = element;
            return a;
		}
	});
	return a;
}; //not finding first true value

var jFilter = function (list, predicate) {
	var a = [];
	each(list, function(element, index, list){
		if (predicate(element) === true) {
			a.push(element);
		}
	});
	return a;
};

var jReject = function (list, predicate) {
	var a = [];
	each(list, function (element, index, list){
		if (predicate(element) === false) {
			a.push(element); 
		}
	});
	return a;
};

var jEvery = function (list, predicate) {
	var a = [];
	each(list, function (element, index, list){
		if (predicate(element) === true) {
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
		if (predicate(element) === true) {
			res = true;
            return res;
		} else {
			res = false;
            return res;
		}
	});
	return res;
};

//contains([1,2,3],3)
var contains = function (list, value) {
	var b;
	each(list, function(element, index, list){
		if (element == value) {
			b = true;
		} 
	});
	return b;
};

var jInvoke = function (list, methodName) {
	var fnstring = methodName;
	var fn = window[fnstring];
	console.log(window[fnstring]);

	if (typeof fn == "function") {
		each(list, function(element, index, list) {
			fn(element);
		});
	}
};

var jPluck = function (list, propertyName) {
	var res = [];
	each(list, function (element, index, list) {
		for (var key in element) {
			if (key == propertyName) {
				res.push(element[key]);
			}
		}
	});
	return res;
};

//jWhere(listOfPlays, {author: "Shakespeare", year: 1611});
//=> [{title: "Cymbeline", author: "Shakespeare", year: 1611},
//    {title: "The Tempest", author: "Shakespeare", year: 1611}]
var jWhere = function (list, properties) {
	var compare = function (obj1, obj2) {
		var res = [], counter = 0;

		for (var i in obj2) {
			counter++;
		}

		for (var j in obj1) {
			for (var k in obj2) {
				if (obj1[j] == obj2[k]) {
					res.push(obj2[k]);
				}
			}
		}

		if (res.length == counter) {
			return obj1;
		} else {
			return null;
		}
	};

	var res = [], temp;
	
	each(list, function (element, index, list){
		if (compare(element, properties)) {
			res.push(compare(element, properties));
		}
	});

	if (res.length > 0) {
		return res;
	} else {
		return "nothing found!";
	}
	
};


//max([{name: "Steve", age: 10},{name: "Jon", age: 15}], function (obj) { return obj.age });
//=> returns {name: "Jon", age: 15}
var jMax = function (list, iterator, context) {
	var property = 0, memo, res;
	each(list, function (element, index, list) {
		memo = iterator(element);
		if (property < memo) {
			property = memo;
		}
	});

	each(list, function (element, index, array) {
		//if element contains property, save property to var
		if (contains(element, property)) {
			res = element;
		}
	});
	return res;
};

//need to add functionality if iterator isn't given
var jMin = function (list, iterator, context) {
	var property, memo, res;
	each(list, function (element, index, list) {
		memo = iterator(element);
		property = memo + 1;
		if (property > memo) {
			property = memo;
		}
	});
	each(list, function (element, index, array) {
		//if element contains property, save property to res
		if (contains(element, property)) {
			res = element;
		}
	});
	return res;
};

//sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
//=> [5, 4, 6, 3, 1, 2]
var sortBy = function(list, iterator, context) {
	if (!iterator) {
		iterator == identity;
	}

	var temp;
	for (var i = 0; i < list.length; i++) {
		for (var j = i+1; j < list.length; j++) {
			if (iterator(list[j]) < iterator(list[i])) {
				temp = list[i];
				list[i] = list[j];
				list[j] = temp;	
			}
		}
	}
	return list;		
};

/*
var jreduceRight = function (list, iterator, memo) {

};

var jFindWhere = function (list, properties) {};
*/


//----------------Functions------------------//

//var func = function(greeting){ return greeting + ': ' + this.name };
//func = _.bind(func, {name: 'moe'}, 'hi');
//func();
//=> 'hi: moe'

var bind = function (func, obj, arguments) {
	return func.call(obj, arguments);
};


/*
var buttonView = {
  label  : 'underscore',
  onClick: function(){ alert('clicked: ' + this.label); },
  onHover: function(){ console.log('hovering: ' + this.label); }
};
_.bindAll(buttonView, 'onClick', 'onHover');
// When the button is clicked, this.label will have the correct value.
jQuery('#underscore_button').bind('click', buttonView.onClick);
*/

//---------------Object Functions--------//
var keys = function (object) {
	if (!isObject(object)) {
		return [];
	}

	var arr = [];
	for (var key in object) {
		arr.push(key);
	}
	return arr;
};

var values = function (object) {
	if (!isObject(object)) {
		return [];
	}

	var arr = [];
	for (var key in object) {
		arr.push(object[key]);
	}
	return arr;
};

var pairs = function (object) {
	if (!isObject(object)) {
		return [];
	}

	var arr = [];
	for (var key in object) {
		arr.push([key, object[key]]);
	}
	return arr;
};

var invert = function (object) {
	if (!isObject(object)) {
		return {};
	}
	
	var res = {};
	for (var key in object) {
		var obj = object[key];
		var stringify = obj.toString();
		console.log(stringify);
		res[stringify] = key;
	}
	return res;
};

var functions = function(object) {
	var names = [];
	for (var key in object) {
		if (isFunction(object[key])) {
			names.push(key);
		}
	}
	return names.sort();
};

var extend = function (destination) {
	each(slice.call(arguments, 1), function (obj) {
		for (var key in obj) {
			destination[key] = obj[key];
		}
	});
	return destination;
};

var pick = function (object) {
	var copy = {};
	each(slice.call(arguments, 1), function (search) {
		for (var key in object) {
			if (search == key) {
				copy[key] = object[key];
			}
		}
	});
	return copy;
};

var omit = function (object) {
	var copy = {};
	var keys = slice.call(arguments,1);
	for (var key in object) {
		if (!contains(keys, key)) {
			copy[key] = object[key];
		}
	}
	return copy;
};

var defaults = function (object, defaults) {
	each(slice.call(arguments,1), function (source) {
		for (var key in source) {
			if(object[key] == 'undefined') {
					object[key] = source[key];
			}
		}
	})
	return object;
};

var clone = function (obj) {
	if (isObject(obj)) {
		return obj;
	}
};
//I don't get underscore's version...

var tap = function(object, interceptor) {
	interceptor(object);
	return object;
};

var has = function(object, key) {
	return hasOwnProperty.call(object, key);
};

var property = function(key) {
	return function(obj){
		return obj[key];
	};
};

var matches= function (attrs){
	return function (obj) {
		for (var key in attrs) {
			if (attrs[key] != obj[key]) {
				return false;
			} else {
				return true
			}
		}
	}
};

var isEqual = function (object, other) {
	//code goes here
};

var isEmpty = function (object) {
	if (object == null) return true;
	if (isArray(object)) return object.length === 0;
};

var isFunction = function (object) {
	return typeof object === 'function';
};

var isObject = function (object) {
	return object === Object(object);
};

var isArray = function(object) {
	return typeof object === 'array';
}
//---------------Utility------------------//
var noConflict = function (){
	//
};


var identity = function(val) {
	return val;
};

var constant = function(value){
	return function(){
		return value;
	};	
};

var times = function(n, iterator, context){
	var arr = [];
	for (var i = 0; i < n; i++) {
		arr.push(iterator(context, i));
	}
	return arr;
};

var random = function (min, max) {
	if (max == null) {
		max = min;
		min = 0;
	}
	return Math.floor(min + Math.random()* (max-min+1));
};

var mixin = function (object) {

};