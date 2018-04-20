'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addToProps = function addToProps(props, key, value) {
  if (props[key]) {
    props[key].push(value);
  } else {
    props[key] = [value];
  }
};

exports.default = function (cardDef) {
  var tokens = cardDef.split(/(->)|([:,()])/g).filter(function (token) {
    return undefined !== token;
  }).map(function (token) {
    return token.trim();
  }).filter(function (token) {
    return '' !== token;
  });

  var props = {};

  var propertyKey = tokens[0];
  var propertyValue = '';

  var i = 2;

  while (i < tokens.length) {
    var token = tokens[i];
    var nextToken = tokens[i + 1];

    if (':' === nextToken) {
      addToProps(props, propertyKey, propertyValue);

      propertyKey = token;
      propertyValue = '';
      i += 2;

      continue;
    }

    propertyValue += token;

    i++;
  }

  addToProps(props, propertyKey, propertyValue);

  return props;
};