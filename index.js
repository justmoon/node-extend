var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var undefined;

var combineArrays = function combineArrays() {
  'use strict';
  var combined = [];
  for (var i = 0; i < arguments.length; i++) {
		for (var n = 0; n < arguments[i].length; n++) {
			if (combined.indexOf(arguments[i][n]) === -1) {
				combined.push(arguments[i][n]);
			}
		}
  }
  combined.sort();
  return combined;
};

var isPlainArray = function isPlainArray() {
	'use strict';
	if (!arguments || !arguments.length) {
		return false;
	}
	for (var i = 0; i < arguments.length; i++) {
		if (!Array.isArray(arguments[i])) {
			return false;
		}
		for (var n = 0; n < arguments[i].length; n++) {
			if (typeof arguments[i][n] != 'string' && typeof arguments[i][n] != 'number') {
				return false;
			}
		}
	}
	
	return true;
};

var isPlainObject = function isPlainObject(obj) {
	'use strict';
	if (!obj || toString.call(obj) !== '[object Object]') {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	'use strict';
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false,
		combine = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
		if (typeof arguments[1] === 'boolean') {
			combine = arguments[1];
			target = arguments[2] || {};
			i = 3;
		}
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		
		// Only deal with non-null/undefined values
		if (options != null) {
			// Combine if we're combining plain arrays
			if (combine && isPlainArray(options, target)) {
				target = combineArrays(target, options);
				continue;
			}
			
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					if (combine) {
						target[name] = extend(deep, combine, clone, copy);
					} else {
						target[name] = extend(deep, clone, copy);
					}

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

