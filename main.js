'use strict';

var CIECalculator = require('./lib/strategies/cie_calculator.js').CIECalculator;
var Alg00 = require('./lib/strategies/alg00.js').Alg00;
var Alg02 = require('./lib/strategies/alg02.js').Alg02;
var Alg03 = require('./lib/strategies/alg03.js').Alg03;
var Alg04 = require('./lib/strategies/alg04.js').Alg04;
var Alg06 = require('./lib/strategies/alg06.js').Alg06;
var Alg10 = require('./lib/strategies/alg10.js').Alg10;
var Alg21 = require('./lib/strategies/alg21.js').Alg21;
var Alg35 = require('./lib/strategies/alg35.js').Alg35;
var Alg36 = require('./lib/strategies/alg36.js').Alg36;
var Alg37 = require('./lib/strategies/alg37.js').Alg37;
var Alg62 = require('./lib/strategies/alg62.js').Alg62;
var Alg77 = require('./lib/strategies/alg77.js').Alg77;
var Alg82 = require('./lib/strategies/alg82.js').Alg82;

module.exports = function(params) {
  var calculator = new CIECalculator();
  calculator.setStrategy(eval('new Alg'+params.alg+'()'));
  return calculator.execute(params);
}
