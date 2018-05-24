'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg37 = function() {};

Alg37.prototype = new CIEStrategy();
Alg37.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1, max: 19}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      throw new Error('Longitud invalida');
    }

    var reference = parseInput(input);
    var acc = cieUtils.weightedReduce(reference, [11,13,17, 19,23]);

    return input.reference.toUpperCase() + cieUtils.pad(((acc + 330 - reference[0]*11)%97)+1,2);
  }
};

module.exports.Alg37 = Alg37;

var parseInput = function(input) {
  var charToNum = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4,N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7,Z: 8,
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
  };
  return _.toArray(cieUtils.replaceCharWithNum(input.reference.toUpperCase(), charToNum)).reverse();
};

