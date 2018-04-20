'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var appendArgumentToCallStack = function appendArgumentToCallStack(argument, callStack) {
  var topCall = callStack[callStack.length - 1];
  var args = topCall.arguments;

  if (0 === args.length) {
    args.push({
      name: 'all',
      arguments: [argument]
    });

    return;
  }

  var lastArg = args[args.length - 1];
  lastArg.arguments.push(argument);
};

var appendEmptyArgumentToCallStack = function appendEmptyArgumentToCallStack(callStack) {
  var topCall = callStack[callStack.length - 1];
  topCall.arguments.push({
    name: 'all',
    arguments: []
  });
};

var parseExpression = function parseExpression(expression) {
  var tokens = expression.split(/([(),\[\]])|(=>)/g).filter(function (token) {
    return undefined !== token;
  }).map(function (token) {
    return token.trim();
  }).filter(function (token) {
    return '' !== token;
  });

  if (0 === tokens.length) {
    return { name: 'all', arguments: [] };
  }

  var callStack = [{ name: 'all', arguments: [] }];

  var parens = 0;

  var i = 0;

  while (i < tokens.length) {
    var token = tokens[i];
    var nextToken = tokens[i + 1];

    if ('cardMatch' === callStack[callStack.length - 1].name) {
      if (']' === token) {
        var topCall = callStack[callStack.length - 1];
        var subExpression = topCall.source;

        var _subExpression$split = subExpression.split('=>'),
            _subExpression$split2 = _slicedToArray(_subExpression$split, 2),
            inputExpression = _subExpression$split2[0],
            outputExpression = _subExpression$split2[1];

        var _map = [inputExpression, outputExpression].map(parseExpression),
            _map2 = _slicedToArray(_map, 2),
            parsedInput = _map2[0],
            parsedOutput = _map2[1];

        topCall.arguments = [parsedInput, parsedOutput];
        callStack.pop();

        i++;
        continue;
      }

      callStack[callStack.length - 1].source += token;

      i++;
      continue;
    }

    if ('(' === nextToken) {
      var newCall = {
        name: token,
        arguments: []
      };

      appendArgumentToCallStack(newCall, callStack);
      callStack.push(newCall);

      i += 2;
      continue;
    }

    if ('[' === token) {
      var _newCall = {
        name: 'cardMatch',
        source: ''
      };

      appendArgumentToCallStack(_newCall, callStack);
      callStack.push(_newCall);

      i++;
      continue;
    }

    if (')' === token) {
      callStack.pop();

      i++;
      continue;
    }

    if (',' === token) {
      appendEmptyArgumentToCallStack(callStack);

      i++;
      continue;
    }

    appendArgumentToCallStack(token, callStack);

    i++;
  }

  return callStack[0].arguments[0];
};

exports.default = parseExpression;