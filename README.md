# extend() for Node.js

`node-extend` is a port of the classic extend() method from jQuery. It behaves as you expect. It is simple, tried and true.

## Installation

This package is available on [NPM](https://npmjs.org/) as: `extend`

``` sh
npm install extend
```

## Usage

**Syntax:** extend **(** [`deep`], `target`, `object1`, [`objectN`] **)** 

*Extend one object with one or more others, returning the modified object.*

Keep in mind that the target object will be modified, and will be returned from extend().

If a boolean true is specified as the first argument, extend performs a deep copy, recursively copying any objects it finds. Otherwise, the copy will share structure with the original object(s).
Undefined properties are not copied. However, properties inherited from the object's prototype will be copied over.

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

`node-extend` is licensed under the [MIT License](http://opensource.org/licenses/MIT).

## Acknowledgements

All credit to the jQuery authors for perfecting this amazing utility.

Ported to Node.js by [Stefan Thomas](https://github.com/justmoon) with contributions by [Jonathan Buchanan](https://github.com/insin).
