'use strict';

var extend = require('../index');
var test = require('tape');

var str = 'me a test';
var integer = 10;
var arr = [1, 'what', new Date(81, 8, 4)];
var date = new Date(81, 4, 13);

var Foo = function () {};

var obj = {
	str: str,
	integer: integer,
	arr: arr,
	date: date,
	constructor: 'fake',
	isPrototypeOf: 'not a function',
	foo: new Foo()
};

var deep = {
	ori: obj,
	layer: {
		integer: 10,
		str: 'str',
		date: new Date(84, 5, 12),
		arr: [101, 'dude', new Date(82, 10, 4)],
		deep: {
			str: obj.str,
			integer: integer,
			arr: obj.arr,
			date: new Date(81, 7, 4)
		}
	}
};

test('missing arguments', function (t) {
	t.deepEqual(extend(undefined, { a: 1 }), { a: 1 }, 'missing first argument is second argument');
	t.deepEqual(extend({ a: 1 }), { a: 1 }, 'missing second argument is first argument');
	t.deepEqual(extend(true, undefined, { a: 1 }), { a: 1 }, 'deep: missing first argument is second argument');
	t.deepEqual(extend(true, { a: 1 }), { a: 1 }, 'deep: missing second argument is first argument');
	t.deepEqual(extend(), {}, 'no arguments is object');
	t.end();
});

test('merge string with string', function (t) {
	var ori = 'what u gonna say';
	var target = extend(ori, str);
	var expectedTarget = {
		0: 'm',
		1: 'e',
		2: ' ',
		3: 'a',
		4: ' ',
		5: 't',
		6: 'e',
		7: 's',
		8: 't'
	};

	t.equal(ori, 'what u gonna say', 'original string 1 is unchanged');
	t.equal(str, 'me a test', 'original string 2 is unchanged');
	t.deepEqual(target, expectedTarget, 'string + string is merged object form of string');
	t.end();
});

test('merge string with number', function (t) {
	var ori = 'what u gonna say';
	var target = extend(ori, 10);

	t.equal(ori, 'what u gonna say', 'original string is unchanged');
	t.deepEqual(target, {}, 'string + number is empty object');

	t.end();
});

test('merge string with array', function (t) {
	var ori = 'what u gonna say';
	var target = extend(ori, arr);

	t.equal(ori, 'what u gonna say', 'original string is unchanged');
	t.deepEqual(arr, [1, 'what', new Date(81, 8, 4)], 'array is unchanged');
	t.deepEqual(target, {
		0: 1,
		1: 'what',
		2: new Date(81, 8, 4)
	}, 'string + array is array');
	t.end();
});

test('merge string with date', function (t) {
	var ori = 'what u gonna say';
	var target = extend(ori, date);

	var testDate = new Date(81, 4, 13);
	t.equal(ori, 'what u gonna say', 'original string is unchanged');
	t.deepEqual(date, testDate, 'date is unchanged');
	t.deepEqual(target, testDate, 'string + date is date');
	t.end();
});

test('merge string with obj', function (t) {
	var ori = 'what u gonna say';
	var target = extend(ori, obj);

	t.equal(ori, 'what u gonna say', 'original string is unchanged');
	var testObj = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', new Date(81, 8, 4)],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};
	t.deepEqual(obj, testObj, 'original obj is unchanged');
	t.deepEqual(target, testObj, 'string + obj is obj');
	t.end();
});

test('merge number with string', function (t) {
	var ori = 20;
	var target = extend(ori, str);

	t.equal(ori, 20, 'number is unchanged');
	t.equal(str, 'me a test', 'string is unchanged');
	t.deepEqual(target, {
		0: 'm',
		1: 'e',
		2: ' ',
		3: 'a',
		4: ' ',
		5: 't',
		6: 'e',
		7: 's',
		8: 't'
	}, 'number + string is object form of string');
	t.end();
});

test('merge number with number', function (t) {
	t.deepEqual(extend(20, 10), {}, 'number + number is empty object');
	t.end();
});

test('merge number with array', function (t) {
	var target = extend(20, arr);

	t.deepEqual(arr, [1, 'what', new Date(81, 8, 4)], 'array is unchanged');
	t.deepEqual(target, {
		0: 1,
		1: 'what',
		2: new Date(81, 8, 4)
	}, 'number + arr is object with array contents');
	t.end();
});

test('merge number with date', function (t) {
	var target = extend(20, date);
	var testDate = new Date(81, 4, 13);

	t.deepEqual(date, testDate, 'original date is unchanged');
	t.deepEqual(target, testDate, 'number + date is date');
	t.end();
});

test('merge number with object', function (t) {
	var target = extend(20, obj);
	var testObj = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', new Date(81, 8, 4)],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};

	t.deepEqual(obj, testObj, 'obj is unchanged');
	t.deepEqual(target, testObj, 'number + obj is obj');
	t.end();
});

test('merge array with string', function (t) {
	var ori = [1, 2, 3, 4, 5, 6];
	var target = extend(ori, str);

	t.deepEqual(ori, str.split(''), 'array is changed to be an array of string chars');
	t.equal(str, 'me a test', 'string is unchanged');
	t.deepEqual(target, {
		0: 'm',
		1: 'e',
		2: ' ',
		3: 'a',
		4: ' ',
		5: 't',
		6: 'e',
		7: 's',
		8: 't'
	}, 'array + string is object form of string');
	t.end();
});

test('merge array with number', function (t) {
	var ori = [1, 2, 3, 4, 5, 6];
	var target = extend(ori, 10);

	t.deepEqual(ori, [1, 2, 3, 4, 5, 6], 'array is unchanged');
	t.deepEqual(target, ori, 'array + number is array');
	t.end();
});

test('merge array with array', function (t) {
	var ori = [1, 2, 3, 4, 5, 6];
	var target = extend(ori, arr);
	var testDate = new Date(81, 8, 4);
	var expectedTarget = [1, 'what', testDate, 4, 5, 6];

	t.deepEqual(ori, expectedTarget, 'array + array merges arrays; changes first array');
	t.deepEqual(arr, [1, 'what', testDate], 'second array is unchanged');
	t.deepEqual(target, expectedTarget, 'array + array is merged array');
	t.end();
});

test('merge array with date', function (t) {
	var ori = [1, 2, 3, 4, 5, 6];
	var target = extend(ori, date);
	var testDate = new Date(81, 4, 13);
	var testArray = [1, 2, 3, 4, 5, 6];

	t.deepEqual(ori, testArray, 'array is unchanged');
	t.deepEqual(date, testDate, 'date is unchanged');
	t.deepEqual(target, testArray, 'array + date is array');
	t.end();
});

test('merge array with object', function (t) {
	var ori = [1, 2, 3, 4, 5, 6];
	var target = extend(ori, obj);
	var testObject = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', new Date(81, 8, 4)],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};

	t.deepEqual(obj, testObject, 'obj is unchanged');
	t.equal(ori.length, 6, 'array has proper length');
	t.equal(ori.str, obj.str, 'array has obj.str property');
	t.equal(ori.integer, obj.integer, 'array has obj.integer property');
	t.deepEqual(ori.arr, obj.arr, 'array has obj.arr property');
	t.equal(ori.date, obj.date, 'array has obj.date property');

	t.equal(target.length, 6, 'target has proper length');
	t.equal(target.str, obj.str, 'target has obj.str property');
	t.equal(target.integer, obj.integer, 'target has obj.integer property');
	t.deepEqual(target.arr, obj.arr, 'target has obj.arr property');
	t.equal(target.date, obj.date, 'target has obj.date property');
	t.end();
});

test('merge date with string', function (t) {
	var ori = new Date(81, 9, 20);
	var target = extend(ori, str);
	var testObject = {
		0: 'm',
		1: 'e',
		2: ' ',
		3: 'a',
		4: ' ',
		5: 't',
		6: 'e',
		7: 's',
		8: 't'
	};

	t.deepEqual(ori, testObject, 'date is changed to object form of string');
	t.equal(str, 'me a test', 'string is unchanged');
	t.deepEqual(target, testObject, 'date + string is object form of string');
	t.end();
});

test('merge date with number', function (t) {
	var ori = new Date(81, 9, 20);
	var target = extend(ori, 10);

	t.deepEqual(ori, {}, 'date is changed to empty object');
	t.deepEqual(target, {}, 'date + number is empty object');
	t.end();
});

test('merge date with array', function (t) {
	var ori = new Date(81, 9, 20);
	var target = extend(ori, arr);
	var testDate = new Date(81, 9, 20);
	var testArray = [1, 'what', new Date(81, 8, 4)];

	t.deepEqual(ori, testDate, 'date is unchanged');
	t.deepEqual(arr, testArray, 'array is unchanged');
	t.deepEqual(target, testDate, 'date + array is date');
	t.end();
});

test('merge date with date', function (t) {
	var ori = new Date(81, 9, 20);
	var target = extend(ori, date);

	t.deepEqual(ori, {}, 'date is empty object');
	t.deepEqual(target, {}, 'date + date is empty object');
	t.end();
});

test('merge date with object', function (t) {
	var ori = new Date(81, 9, 20);
	var target = extend(ori, obj);
	var testDate = new Date(81, 8, 4);
	var testObject = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', testDate],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};

	t.deepEqual(obj, testObject, 'original object is unchanged');
	t.deepEqual(ori, testObject, 'date becomes original object');
	t.deepEqual(target, testObject, 'date + object is object');
	t.end();
});

test('merge object with string', function (t) {
	var testDate = new Date(81, 7, 26);
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: testDate
	};
	var target = extend(ori, str);
	var testObj = {
		0: 'm',
		1: 'e',
		2: ' ',
		3: 'a',
		4: ' ',
		5: 't',
		6: 'e',
		7: 's',
		8: 't',
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: testDate
	};

	t.deepEqual(ori, testObj, 'original object updated');
	t.equal(str, 'me a test', 'string is unchanged');
	t.deepEqual(target, testObj, 'object + string is object + object form of string');
	t.end();
});

test('merge object with number', function (t) {
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};
	var testObject = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};
	var target = extend(ori, 10);
	t.deepEqual(ori, testObject, 'object is unchanged');
	t.deepEqual(target, testObject, 'object + number is object');
	t.end();
});

test('merge object with array', function (t) {
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};
	var target = extend(ori, arr);
	var testObject = {
		0: 1,
		1: 'what',
		2: new Date(81, 8, 4),
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};

	t.deepEqual(ori, testObject, 'original object is merged');
	t.deepEqual(arr, [1, 'what', testObject[2]], 'array is unchanged');
	t.deepEqual(target, testObject, 'object + array is merged object');
	t.end();
});

test('merge object with date', function (t) {
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};
	var target = extend(ori, date);
	var testObject = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26)
	};

	t.deepEqual(ori, testObject, 'original object is unchanged');
	t.deepEqual(date, new Date(81, 4, 13), 'date is unchanged');
	t.deepEqual(target, testObject, 'object + date is object');
	t.end();
});

test('merge object with object', function (t) {
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26),
		foo: 'bar'
	};
	var target = extend(ori, obj);
	var expectedObj = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', new Date(81, 8, 4)],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};
	var expectedTarget = {
		str: 'me a test',
		integer: 10,
		arr: [1, 'what', new Date(81, 8, 4)],
		date: new Date(81, 4, 13),
		constructor: 'fake',
		isPrototypeOf: 'not a function',
		foo: new Foo()
	};

	t.deepEqual(obj, expectedObj, 'obj is unchanged');
	t.deepEqual(ori, expectedTarget, 'original has been merged');
	t.deepEqual(target, expectedTarget, 'object + object is merged object');
	t.end();
});

test('deep clone', function (t) {
	var ori = {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26),
		layer: { deep: { integer: 42 } }
	};
	var target = extend(true, ori, deep);

	t.deepEqual(ori, {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26),
		ori: {
			str: 'me a test',
			integer: 10,
			arr: [1, 'what', new Date(81, 8, 4)],
			date: new Date(81, 4, 13),
			constructor: 'fake',
			isPrototypeOf: 'not a function',
			foo: new Foo()
		},
		layer: {
			integer: 10,
			str: 'str',
			date: new Date(84, 5, 12),
			arr: [101, 'dude', new Date(82, 10, 4)],
			deep: {
				str: 'me a test',
				integer: 10,
				arr: [1, 'what', new Date(81, 8, 4)],
				date: new Date(81, 7, 4)
			}
		}
	}, 'original object is merged');
	t.deepEqual(deep, {
		ori: {
			str: 'me a test',
			integer: 10,
			arr: [1, 'what', new Date(81, 8, 4)],
			date: new Date(81, 4, 13),
			constructor: 'fake',
			isPrototypeOf: 'not a function',
			foo: new Foo()
		},
		layer: {
			integer: 10,
			str: 'str',
			date: new Date(84, 5, 12),
			arr: [101, 'dude', new Date(82, 10, 4)],
			deep: {
				str: 'me a test',
				integer: 10,
				arr: [1, 'what', new Date(81, 8, 4)],
				date: new Date(81, 7, 4)
			}
		}
	}, 'deep is unchanged');
	t.deepEqual(target, {
		str: 'no shit',
		integer: 76,
		arr: [1, 2, 3, 4],
		date: new Date(81, 7, 26),
		ori: {
			str: 'me a test',
			integer: 10,
			arr: [1, 'what', new Date(81, 8, 4)],
			date: new Date(81, 4, 13),
			constructor: 'fake',
			isPrototypeOf: 'not a function',
			foo: new Foo()
		},
		layer: {
			integer: 10,
			str: 'str',
			date: new Date(84, 5, 12),
			arr: [101, 'dude', new Date(82, 10, 4)],
			deep: {
				str: 'me a test',
				integer: 10,
				arr: [1, 'what', new Date(81, 8, 4)],
				date: new Date(81, 7, 4)
			}
		}
	}, 'deep + object + object is deeply merged object');

	target.layer.deep = 339;
	t.deepEqual(deep, {
		ori: {
			str: 'me a test',
			integer: 10,
			arr: [1, 'what', new Date(81, 8, 4)],
			date: new Date(81, 4, 13),
			constructor: 'fake',
			isPrototypeOf: 'not a function',
			foo: new Foo()
		},
		layer: {
			integer: 10,
			str: 'str',
			date: new Date(84, 5, 12),
			arr: [101, 'dude', new Date(82, 10, 4)],
			deep: {
				str: 'me a test',
				integer: 10,
				arr: [1, 'what', new Date(81, 8, 4)],
				date: new Date(81, 7, 4)
			}
		}
	}, 'deep is unchanged after setting target property');
	// ----- NEVER USE EXTEND WITH THE ABOVE SITUATION ------------------------------
	t.end();
});

test('deep clone; arrays are merged', function (t) {
	var defaults = { arr: [1, 2, 3] };
	var override = { arr: ['x'] };
	var expectedTarget = { arr: ['x', 2, 3] };

	var target = extend(true, defaults, override);

	t.deepEqual(target, expectedTarget, 'arrays are merged');
	t.end();
});

test('deep clone === false; objects merged normally', function (t) {
	var defaults = { a: 1 };
	var override = { a: 2 };
	var target = extend(false, defaults, override);
	t.deepEqual(target, override, 'deep === false handled normally');
	t.end();
});

test('pass in null; should create a valid object', function (t) {
	var override = { a: 1 };
	var target = extend(null, override);
	t.deepEqual(target, override, 'null object handled normally');
	t.end();
});

test('works without Array.isArray', function (t) {
	var savedIsArray = Array.isArray;
	Array.isArray = false; // don't delete, to preserve enumerability
	var target = [];
	var source = [1, [2], { 3: true }];
	t.deepEqual(
		extend(true, target, source),
		[1, [2], { 3: true }],
		'It works without Array.isArray'
	);
	Array.isArray = savedIsArray;
	t.end();
});

test('non-object target', function (t) {
	t.deepEqual(extend(3.14, { a: 'b' }), { a: 'b' });
	t.deepEqual(extend(true, 3.14, { a: 'b' }), { a: 'b' });

	t.end();
});

test('__proto__ is merged as an own property', function (t) {
	var malicious = { fred: 1 };
	Object.defineProperty(malicious, '__proto__', { value: { george: 1 }, enumerable: true });
	var target = {};
	extend(true, target, malicious);
	t.notOk(target.george);
	t.ok(Object.prototype.hasOwnProperty.call(target, '__proto__'));
	t.deepEqual(Object.getOwnPropertyDescriptor(target, '__proto__').value, { george: 1 });

	t.end();
});
