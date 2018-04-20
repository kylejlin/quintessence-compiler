'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _getIndividualCardDefsFromMultiDef = require('./getIndividualCardDefsFromMultiDef');

var _getIndividualCardDefsFromMultiDef2 = _interopRequireDefault(_getIndividualCardDefsFromMultiDef);

var _getPropertiesFromCardDef = require('./getPropertiesFromCardDef');

var _getPropertiesFromCardDef2 = _interopRequireDefault(_getPropertiesFromCardDef);

var _parseExpression = require('./parseExpression');

var _parseExpression2 = _interopRequireDefault(_parseExpression);

var _computeParsedExpression = require('./computeParsedExpression');

var _computeParsedExpression2 = _interopRequireDefault(_computeParsedExpression);

var _mapObject = require('./mapObject');

var _mapObject2 = _interopRequireDefault(_mapObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compileActionCardDefinitionsToJSON = function compileActionCardDefinitionsToJSON(multiDef) {
  var cardDefs = (0, _getIndividualCardDefsFromMultiDef2.default)(multiDef);
  var cardProps = (0, _mapObject2.default)(cardDefs, _getPropertiesFromCardDef2.default);

  var parsedCardProps = (0, _mapObject2.default)(cardProps, function (cardProp) {
    var attacks = cardProp.attack || [];
    var defenses = cardProp.defense || [];
    var boths = cardProp.both || [];
    var prices = cardProp.price || [];
    var variables = cardProp.variable || [];

    return {
      attacks: attacks.map(splitArrow).map(function (_ref) {
        var input = _ref.input,
            output = _ref.output;

        return {
          input: (0, _parseExpression2.default)(input),
          output: (0, _parseExpression2.default)(output)
        };
      }),
      defenses: defenses.map(splitArrow).map(function (_ref2) {
        var input = _ref2.input,
            output = _ref2.output;

        return {
          input: (0, _parseExpression2.default)(input),
          output: (0, _parseExpression2.default)(output)
        };
      }),
      boths: boths.map(splitArrow).map(function (_ref3) {
        var input = _ref3.input,
            output = _ref3.output;

        return {
          input: (0, _parseExpression2.default)(input),
          output: (0, _parseExpression2.default)(output)
        };
      }),
      prices: prices.map(_parseExpression2.default),
      variables: variables.map(_parseExpression2.default)
    };
  });

  var computedCardProps = (0, _mapObject2.default)(parsedCardProps, function (parsedCardProp) {
    var attacks = parsedCardProp.attacks,
        defenses = parsedCardProp.defenses,
        boths = parsedCardProp.boths,
        prices = parsedCardProp.prices,
        variables = parsedCardProp.variables;


    return {
      attacks: attacks.map(function (_ref4) {
        var input = _ref4.input,
            output = _ref4.output;

        return {
          input: (0, _computeParsedExpression2.default)(input),
          output: (0, _computeParsedExpression2.default)(output)
        };
      }),
      defenses: defenses.map(function (_ref5) {
        var input = _ref5.input,
            output = _ref5.output;

        return {
          input: (0, _computeParsedExpression2.default)(input),
          output: (0, _computeParsedExpression2.default)(output)
        };
      }),
      boths: boths.map(function (_ref6) {
        var input = _ref6.input,
            output = _ref6.output;

        return {
          input: (0, _computeParsedExpression2.default)(input),
          output: (0, _computeParsedExpression2.default)(output)
        };
      }),
      prices: prices.map(function (price) {
        return (0, _computeParsedExpression2.default)(price);
      }),
      variables: variables.map(function (variable) {
        var expr = variable.arguments[0].arguments[0].arguments[0];
        var parts = expr.split(/([a-zA-Z]+)/).filter(function (part) {
          return undefined !== part;
        }).map(function (part) {
          return part.trim();
        }).filter(function (part) {
          return '' !== part;
        });

        var nameIndex = parts.findIndex(function (part) {
          return (/^[a-zA-Z]+$/.test(part)
          );
        });
        var name = parts[nameIndex];

        var minExpr = nameIndex === 0 ? null : parts[0];
        var maxExpr = nameIndex !== parts.length - 2 ? null : parts[parts.length - 1];

        var minimum = minExpr ? {
          isInclusive: minExpr.indexOf('<=') > -1,
          value: +extractDigits(minExpr)
        } : null;
        var maximum = maxExpr ? {
          isInclusive: maxExpr.indexOf('<=') > -1,
          value: +extractDigits(maxExpr)
        } : null;

        return {
          name: name,
          minimum: minimum,
          maximum: maximum
        };
      })
    };
  });

  return computedCardProps;
};

var extractDigits = function extractDigits(string) {
  return string.split('').filter(function (char) {
    return (/\d/.test(char)
    );
  }).join('');
};

var splitArrow = function splitArrow(expression) {
  var _expression$split = expression.split('->'),
      _expression$split2 = _slicedToArray(_expression$split, 2),
      inputExpression = _expression$split2[0],
      outputExpression = _expression$split2[1];

  return {
    input: inputExpression,
    output: outputExpression
  };
};

exports.default = compileActionCardDefinitionsToJSON;