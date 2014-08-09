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
};


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
};



var jFind = function (list, predicate) {
	var a; 
	jEachReverse(list, function(element, index, list){
		if (predicate(element) === true) {
			a = element;
            return a;
		}
	});
	return a;
}; //not finding first true value

var jFilter = function (list, predicate) {
	var a = [];
	jEach(list, function(element, index, list){
		if (predicate(element) === true) {
			a.push(element);
		}
	});
	return a;
};

var jReject = function (list, predicate) {
	var a = [];
	jEach(list, function (element, index, list){
		if (predicate(element) === false) {
			a.push(element); 
		}
	});
	return a;
};

var jEvery = function (list, predicate) {
	var a = [];
	jEach(list, function (element, index, list){
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

//jContains([1,2,3],3)
var jContains = function (list, value) {
	var b;
	jEach(list, function(element, index, list){
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
	
	jEach(list, function (element, index, list){
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
	jEach(list, function (element, index, list) {
		memo = iterator(element)
		if (property < memo) {
			property = memo;
		}
	});

	jEach(list, function (element, index, array) {
		//if element contains property, save property to var
		if (jContains(element, property)) {
			res = element;
		}
	});
	return res;
};


/*
var jreduceRight = function (list, iterator, memo) {

};

var jFindWhere = function (list, properties) {};
*/
