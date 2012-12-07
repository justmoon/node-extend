var buster = require('buster');
var extend = require('..');

var options = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" },
    optionsCopy = { "xnumber2": 1, "xstring2": "x", "xxx": "newstring" };

buster.testCase("extend", {
  "basic 1": function() {
    var settings = { "xnumber1": 5, "xnumber2": 7, "xstring1": "peter", "xstring2": "pan" },
        merged = { "xnumber1": 5, "xnumber2": 1, "xstring1": "peter", "xstring2": "x", "xxx": "newstring" };
    extend(settings, options);
    assert.equals( settings, merged, "Check if extended: settings must be extended" );
    assert.equals( options, optionsCopy, "Check if not modified: options must not be modified" );

    extend(settings, null, options);
    assert.equals( settings, merged, "Check if extended: settings must be extended" );
    assert.equals( options, optionsCopy, "Check if not modified: options must not be modified" );
  },

  "deep clone": function() {
    var deep1 = { "foo": { "bar": true } },
        deep1copy = { "foo": { "bar": true } },
        deep2 = { "foo": { "baz": true }, "foo2": global },
        deep2copy = { "foo": { "baz": true }, "foo2": global },
        deepmerged = { "foo": { "bar": true, "baz": true }, "foo2": global };

    extend(true, deep1, deep2);
    assert.equals( deep1["foo"], deepmerged["foo"], "Check if foo: settings must be extended" );
    assert.equals( deep2["foo"], deep2copy["foo"], "Check if not deep2: options must not be modified" );
    assert.equals( deep1["foo2"], global, "Make sure that a deep clone was not attempted on the global object" );
  },

  "arrays": function() {
    var arr = [1, 2, 3],
        nestedarray = { "arr": arr };

    assert( extend(true, {}, nestedarray)["arr"] !== arr, "Deep extend of object must clone child array" );

    // #5991
    assert( Array.isArray( extend(true, { "arr": {} }, nestedarray)["arr"] ), "Cloned array heve to be an Array" );
    refute( Array.isArray( extend(true, { "arr": arr }, { "arr": {} })["arr"] ), "Cloned object heve to be an plain object" );
  },

  "length property": function() {
    var empty = {};
    var optionsWithLength = { "foo": { "length": -1 } };
    extend(true, empty, optionsWithLength);
    assert.equals( empty["foo"], optionsWithLength["foo"], "The length property must copy correctly" );
  },

  "dates": function() {
    var empty = {};
    var optionsWithDate = { "foo": { "date": new Date() } };
    extend(true, empty, optionsWithDate);
    assert.equals( empty["foo"], optionsWithDate["foo"], "Dates copy correctly" );
  },

  "custom objects": function() {
    /** @constructor */
    var myKlass = function() {};
    var customObject = new myKlass();
    var optionsWithCustomObject = { "foo": { "date": customObject } };
    var empty = {};
    extend(true, empty, optionsWithCustomObject);
    assert( empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly (no methods)" );

    // Makes the class a little more realistic
    myKlass.prototype = { "someMethod": function(){} };
    empty = {};
    extend(true, empty, optionsWithCustomObject);
    assert( empty["foo"] && empty["foo"]["date"] === customObject, "Custom objects copy correctly" );
  },

  "wrapped numbers": function() {
    var MyNumber = Number;
    var ret = extend(true, { "foo": 4 }, { "foo": new MyNumber(5) } );
    assert( ret.foo == 5, "Wrapped numbers copy correctly" );
  },

  "null and undefined": function() {
    var nullUndef;
    nullUndef = extend({}, options, { "xnumber2": null });
    assert( nullUndef["xnumber2"] === null, "Check to make sure null values are copied");

    nullUndef = extend({}, options, { "xnumber2": undefined });
    assert( nullUndef["xnumber2"] === options["xnumber2"], "Check to make sure undefined values are not copied");

    nullUndef = extend({}, options, { "xnumber0": null });
    assert( nullUndef["xnumber0"] === null, "Check to make sure null values are inserted");

    var obj = { foo:null };
    extend(true, obj, { foo:"notnull" } );
    assert.equals( obj.foo, "notnull", "Make sure a null value can be overwritten" );

    var ret = extend(true, { foo:"bar" }, { foo:null } );
    assert( typeof ret.foo !== "undefined", "Make sure a null value doesn't crash with deep extend, for #1908" );
  },

  "recursive object": function() {
    var target = {};
    var recursive = { foo:target, bar:5 };
    extend(true, target, recursive);
    assert.equals( target, { bar:5 }, "Check to make sure a recursive obj doesn't go never-ending loop by not copying it over" );
  },

  "falsy values": function() {
    var ret = extend(true, { foo: [] }, { foo: [0] } ); // 1907
    assert.equals( ret.foo.length, 1, "Check to make sure a value with coersion 'false' copies over when necessary to fix #1907" );
  },

  "coerced equal values": function() {
    var ret = extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] } );
    assert( typeof ret.foo != "string", "Check to make sure values equal with coersion (but not actually equal) overwrite correctly" );
  },

  "function": function() {
    function func() {}
    extend(func, { key: "value" } );
    assert.equals( func.key, "value", "Verify a function can be extended" );
  },

  "immutability": function() {
    var defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
        defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
        options1 = { xnumber2: 1, xstring2: "x" },
        options1Copy = { xnumber2: 1, xstring2: "x" },
        options2 = { xstring2: "xx", xxx: "newstringx" },
        options2Copy = { xstring2: "xx", xxx: "newstringx" },
        merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

    var settings = extend({}, defaults, options1, options2);
    assert.equals( settings, merged2, "Check if extended: settings must be extended" );
    assert.equals( defaults, defaultsCopy, "Check if not modified: options1 must not be modified" );
    assert.equals( options1, options1Copy, "Check if not modified: options1 must not be modified" );
    assert.equals( options2, options2Copy, "Check if not modified: options2 must not be modified" );
  }
});
