'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg36 = function() {};

Alg36.prototype = new CIEStrategy();
Alg36.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1, max: 19}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      throw new Error('Longitud invalida');
    }

    var acc = cieUtils.sequentialWeightedReduce(parseInput(input), [2,1]);
    return input.reference.toUpperCase() + (cieUtils.nearestMultipleOf(acc,10) - acc)%10;
  }
};

module.exports.Alg36 = Alg36;

var parseInput = function(input) {
  var charToNum = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4,N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7,Z: 8,
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
  };
  return _.toArray(cieUtils.replaceCharWithNum(input.reference.toUpperCase(), charToNum)).reverse();
};

