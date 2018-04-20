'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isLineComment = function isLineComment(line) {
  return '//' === line.slice(0, 2);
};

exports.default = function (multiDef) {
  var lines = multiDef.split('\n').map(function (line) {
    return line.trim();
  }).filter(function (line) {
    return '' !== line;
  });
  var meaningfulLines = lines.filter(function (line) {
    return !isLineComment(line);
  });
  var cleanedMultiDef = meaningfulLines.join('');

  var cardDefs = {};

  var name = '';
  var def = '';
  var whatToAppendCharTo = 'NAME';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cleanedMultiDef[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var char = _step.value;

      if (whatToAppendCharTo === 'NAME') {
        if (char === '{') {

          whatToAppendCharTo = 'DEF';

          continue;
        }

        name += char;
      }

      if (whatToAppendCharTo === 'DEF') {
        if (char === '}') {

          cardDefs[name.trim()] = def.trim();

          name = '';
          def = '';
          whatToAppendCharTo = 'NAME';

          continue;
        }

        def += char;
      }
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

  return cardDefs;
};