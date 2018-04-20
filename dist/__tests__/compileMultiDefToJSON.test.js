'use strict';

var _sampleActionCardMultiDef = require('./sampleActionCardMultiDef.asset');

var _sampleActionCardMultiDef2 = _interopRequireDefault(_sampleActionCardMultiDef);

var _compileMultiDefToJSON = require('../compileMultiDefToJSON');

var _compileMultiDefToJSON2 = _interopRequireDefault(_compileMultiDefToJSON);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it generates the correct JSON', function () {
  var json = (0, _compileMultiDefToJSON2.default)(_sampleActionCardMultiDef2.default);
  expect(json).toMatchSnapshot();
});