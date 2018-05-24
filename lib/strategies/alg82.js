'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg82 = function() {};

Alg82.prototype = new CIEStrategy();
Alg82.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 15,max: 42}},
      date: {length: {min: 8,max: 8}},
      amount: {length: {min: 1,max: 12}},
      digit: {length: {min: 1,max: 1}}
    };
    if (!cieUtils.validateInput(input,validationRules )) {
      throw new Error('Longitud invalida');
    }
    var condensedInput = parseInput(input);
    var acc = cieUtils.weightedReduce(condensedInput.reference,[11,13,17,19,23]);

    return input.reference + condensedInput.date + condensedInput.amount + input.digit + cieUtils.pad(((acc%97)+1),2);
  }
};

module.exports.Alg82 = Alg82;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  var charToNum = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3,
    M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7,
    Y: 8, Z: 9, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
  };

  var numOnlyReference = cieUtils.replaceCharWithNum(input.reference.toUpperCase(), charToNum).join('');
  var paddedDate = cieUtils.pad((input.date.substr(4,4)-2014)*372 + (input.date.substr(2,2)-1)*31 + (input.date.substr(0,2)-1),4);
  var paddedAmount = cieUtils.weightedReduce(_.without(_.toArray(input.amount),'.').reverse(),[7,3,1])%10;

  return {
    reference: _.toArray(numOnlyReference + paddedDate + paddedAmount + input.digit).reverse(),
    amount: paddedAmount,
    date: paddedDate
  };
};
