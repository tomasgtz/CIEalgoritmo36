'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg77 = function() {};

Alg77.prototype = new CIEStrategy();
Alg77.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 12}},
      date: {length: {min: 8,max: 8}},
      amount: {length: {min: 1,max: 12}}
    };
    if (!cieUtils.validateInput(input,validationRules )) {
      throw new Error('Longitud invalida');
    }
    var condensedInput = parseInput(input);
    var acc = cieUtils.weightedReduce(condensedInput.reference,[11,13,17,19,23]);

    return input.reference + condensedInput.date + condensedInput.amount + '2' + cieUtils.pad(((acc%97)+1),2);
  }
};

module.exports.Alg77 = Alg77;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  var paddedDate = cieUtils.pad((input.date.substr(4,4)-2013)*372 + (input.date.substr(2,2)-1)*31 + (input.date.substr(0,2)-1),4);
  var paddedAmount = cieUtils.weightedReduce(_.without(_.toArray(input.amount),'.').reverse(),[7,3,1])%10;

  return {
    reference: _.toArray(input.reference + paddedDate + paddedAmount + '2').reverse(),
    amount: paddedAmount,
    date: paddedDate
  };
};
