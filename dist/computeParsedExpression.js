'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Option = function () {
  function Option() {
    _classCallCheck(this, Option);

    this.energy = [0, 0, 0];
    this.mana = [0, 0, 0];
    this.strength = [0, 0, 0];
    this.transfers = [];
  }

  _createClass(Option, [{
    key: 'addToProperty',
    value: function addToProperty(key, otherAddend) {
      var legalKeys = 'energy mana strength'.split(' ');
      if (!legalKeys.includes(key)) {
        throw new TypeError('Valid keys are ' + legalKeys.join(', ') + '\nYou provided: ' + key);
      }

      if (otherAddend.length < 3) {
        throw new RangeError('Vectors must have at least 3 components.');
      }

      var property = this[key];

      for (var i = 0; i < 3; i++) {
        if ('number' === typeof property[i] && 'number' === typeof otherAddend[i]) {
          property[i] += otherAddend[i];
        } else {
          property[i] = ['+', property[i], otherAddend[i]];
        }
      }
    }
  }]);

  return Option;
}();

var Matcher = function () {
  function Matcher() {
    _classCallCheck(this, Matcher);

    this.energy = [null, null, null];
    this.mana = [null, null, null];
    this.strength = [null, null, null];
  }

  _createClass(Matcher, [{
    key: 'addToProperty',
    value: function addToProperty(key, otherAddend) {
      var legalKeys = 'energy mana strength'.split(' ');
      if (!legalKeys.includes(key)) {
        throw new TypeError('Valid keys are ' + legalKeys.join(', ') + '\nYou provided: ' + key);
      }

      if (otherAddend.length < 3) {
        throw new RangeError('Vectors must have at least 3 components.');
      }

      var property = this[key];

      for (var i = 0; i < 3; i++) {
        property[i] = 0;
      }

      for (var _i = 0; _i < 3; _i++) {
        if ('number' === typeof property[_i] && 'number' === typeof otherAddend[_i]) {
          property[_i] += otherAddend[_i];
        } else {
          property[_i] = ['+', property[_i], otherAddend[_i]];
        }
      }
    }
  }]);

  return Matcher;
}();

var computeParsedExpression = function computeParsedExpression(expression) {
  if ('all' === expression.name) {
    var all = new Option();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = expression.arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var subEx = _step.value;

        if ('transfer' === subEx.name) {
          var _subEx$arguments = _slicedToArray(subEx.arguments, 3),
              startLocation = _subEx$arguments[0],
              endLocation = _subEx$arguments[1],
              matcher = _subEx$arguments[2];

          all.transfers.push({
            startLocation: startLocation.arguments,
            endLocation: endLocation.arguments,
            matcher: matcher.arguments[0].arguments.map(computeParsedMatcher)
          });
          continue;
        }

        var args = subEx.arguments.map(function (arg) {
          return arg.arguments[0];
        }).map(function (arg) {
          return (/^\d+$/.test(arg) ? +arg : parseArithmetic(arg)
          );
        });

        all.addToProperty(subEx.name, args);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return all;
  }

  console.log(expression);
  throw new Error('Cannot compute the following: ' + expression);
};

var computeParsedMatcher = function computeParsedMatcher(expression) {
  if ('all' === expression.name) {
    var all = new Matcher();

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = expression.arguments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var subEx = _step2.value;

        if ('transfer' === subEx.name) {
          var _subEx$arguments2 = _slicedToArray(subEx.arguments, 3),
              startLocation = _subEx$arguments2[0],
              endLocation = _subEx$arguments2[1],
              matcher = _subEx$arguments2[2];

          all.transfers.push({
            startLocation: startLocation.arguments,
            endLocation: endLocation.arguments,
            matcher: matcher.arguments[0].arguments.map(computeParsedMatcher)
          });
          continue;
        }

        var args = subEx.arguments.map(function (arg) {
          return arg.arguments[0];
        }).map(function (arg) {
          return (/^\d+$/.test(arg) ? +arg : parseArithmetic(arg)
          );
        });

        all.addToProperty(subEx.name, args);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return all;
  }

  console.log(expression);
  throw new Error('Cannot compute the following: ' + expression);
};

var parseArithmetic = function parseArithmetic(expression) {
  var tokens = expression.split(/([+\-*/<>])/g).filter(function (token) {
    return undefined !== token;
  }).map(function (token) {
    return token.trim();
  }).filter(function (token) {
    return '' !== token;
  });

  var stack = [['+', 0]];

  var i = 0;

  while (i < tokens.length) {
    var token = tokens[i];
    var nextToken = tokens[i + 1];

    if (/^[+\-*/]$/.test(nextToken)) {
      var newNode = [nextToken, token];
      stack[stack.length - 1][2] = newNode;
      stack.push(newNode);

      i += 2;
      continue;
    }

    if ('<' === token) {
      i++;

      var subExStart = i;

      var brackets = 1;

      while (i < tokens.length) {
        var _token = tokens[i];

        if ('<' === _token) {
          brackets++;
          i++;
          continue;
        }

        if ('>' === _token) {
          brackets--;
          i++;
          if (0 === brackets) {
            break;
          }
          continue;
        }

        i++;
      }

      var subEx = tokens.slice(subExStart, i - 1).join('');

      var nextOp = tokens[i];

      var _newNode = /^[+\-*/]$/.test(nextOp) ? [nextOp, parseArithmetic(subEx)] : parseArithmetic(subEx);
      stack[stack.length - 1][2] = _newNode;
      stack.push(_newNode);

      continue;
    }

    stack[stack.length - 1][2] = token;

    i++;
    continue;
  }

  return stack[0][2];
};

exports.default = computeParsedExpression;