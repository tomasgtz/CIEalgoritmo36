'use strict';

var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg35 = function() {};

Alg35.prototype = new CIEStrategy();
Alg35.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1, max: 19}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      throw new Error('Longitud invalida');
    }

    var acc = cieUtils.sequentialWeightedReduce(parseInput(input), [4,3,8]);
    return input.reference.toUpperCase() + (cieUtils.nearestMultipleOf(acc,10) - acc)%10;
  }
};

module.exports.Alg35 = Alg35;

var parseInput = function(input) {
  var charToNum = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10, K: 11, L: 12, M: 13,
    N: 14,O: 15, P: 16, Q: 17, R: 18, S: 19, T: 20, U: 21, V: 22, W: 23, X: 24, Y: 25,
    Z: 26,1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
  };
  return cieUtils.replaceCharWithNum(input.reference.toUpperCase(), charToNum);
};

