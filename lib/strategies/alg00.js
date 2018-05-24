
'use strict';

var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg00 = function() {};

Alg00.prototype = new CIEStrategy();
Alg00.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 19}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      var error = new Error('Longitud invalida');
      error.status = '422';
      throw error;
    }

    var acc = 0;
    var tmpInput = input.reference.split("").reverse().join("")
    for(var i = 0; i < input.reference.length; i++) {
      acc += cieUtils.sequentialAdd( parseInt(tmpInput[i],10) * ( ( (i+1)%2 !== 0 ) ? 2 : 1) );
    }

    return input.reference + (cieUtils.nearestMultipleOf(acc,10) - acc)%10;
  }
};

module.exports.Alg00 = Alg00;
