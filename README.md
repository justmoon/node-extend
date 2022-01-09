# extend() for Node.js <sup>[![Version Badge][npm-version-svg]][npm-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][npm-url]

`node-extend` is a port of the classic extend() method from jQuery. It behaves as you expect. It is simple, tried and true.

Notes:

* Since Node.js >= 4,
  [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  now offers the same functionality natively (but without the "deep copy" option).
  See [ECMAScript 2015 (ES6) in Node.js](https://nodejs.org/en/docs/es6).
* Some native implementations of `Object.assign` in both Node.js and many
  browsers (since NPM modules are for the browser too) may not be fully
  spec-compliant.
  Check [`object.assign`](https://www.npmjs.com/package/object.assign) module for
  a compliant candidate.

## Installation

This package is available on [npm][npm-url] as: `extend`

``` sh
npm install extend
```

## Usage

**Syntax:** extend **(** [`deep`], `target`, `object1`, [`objectN`] **)**

*Extend one object with one or more others, returning the modified object.*

**Example:**

``` js
var extend = require('extend');
extend(targetObject, object1, object2);
```

Keep in mind that the target object will be modified, and will be returned from extend().

If a boolean true is specified as the first argument, extend performs a deep copy, recursively copying any objects it finds. Otherwise, the copy will share structure with the original object(s).
Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over.
Warning: passing `false` as the first argument is not supported.

### Arguments

* `deep` *Boolean* (optional)
If set, the merge becomes recursive (i.e. deep copy).
* `target`	*Object*
The object to extend.
* `object1`	*Object*
The object that will be merged into the first.
* `objectN` *Object* (Optional)
More objects to merge into the first.

## License

`node-extend` is licensed under the [MIT License][mit-license-url].

## Acknowledgements

All credit to the jQuery authors for perfecting this amazing utility.

Ported to Node.js by [Stefan Thomas][github-justmoon] with contributions by [Jonathan Buchanan][github-insin] and [Jordan Harband][github-ljharb].

[npm-url]: https://npmjs.org/package/extend
[npm-version-svg]: https://versionbadg.es/justmoon/node-extend.svg
[deps-svg]: https://david-dm.org/justmoon/node-extend.svg
[deps-url]: https://david-dm.org/justmoon/node-extend
[dev-deps-svg]: https://david-dm.org/justmoon/node-extend/dev-status.svg
[dev-deps-url]: https://david-dm.org/justmoon/node-extend#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/extend.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/extend.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/extend.svg
[downloads-url]: https://npm-stat.com/charts.html?package=extend
[codecov-image]: https://codecov.io/gh/justmoon/node-extend/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/justmoon/node-extend/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/justmoon/node-extend
[actions-url]: https://github.com/justmoon/node-extend/actions
[github-justmoon]: https://github.com/justmoon
[github-insin]: https://github.com/insin
[github-ljharb]: https://github.com/ljharb
[mit-license-url]: http://opensource.org/licenses/MIT
