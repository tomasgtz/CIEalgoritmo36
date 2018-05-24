'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg21 = function() {};

Alg21.prototype = new CIEStrategy();
Alg21.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 20}},
      date: {length: {min: 8,max: 8}},
      amount: {length: {min: 1,max: 15}}
    };
    if (!cieUtils.validateInput(input,validationRules )) {
      throw new Error('Longitud invalida');
    }
    var condensedInput = parseInput(input);
    var acc = cieUtils.weightedReduce(_.toArray(condensedInput.reference).reverse(),[11,13,17,19,23]);
    var acc_2 = ((acc % 97)+1)%10;

    return condensedInput.reference + acc_2;
  }
};

module.exports.Alg21 = Alg21;

var isLeap = function(year) {
  return new Date(year, 1, 29).getDate() === 29;
}
// TODO Maybe move this to a template?
var parseInput = function(input) {
  var month_multiplier = 31;
  switch (input.date.substr(2,2)-1) {
    case 4:
    case 6:
    case 9:
    case 11:
      month_multiplier = 30;
      break;
    case 2:
      month_multiplier = (isLeap ? 29 : 28)
      break;
  }
  var paddedDate = cieUtils.pad((input.date.substr(4,4)-2014)*360 + (input.date.substr(2,2)-1)*month_multiplier + (input.date.substr(0,2)-1),4);
  var paddedAmount1 = cieUtils.weightedReduce(_.without(_.toArray(input.amount),'.').reverse(),[1,2,3,7,11,13,17])%10;
  var paddedAmount2 = cieUtils.weightedReduce(_.without(_.toArray(input.amount),'.').reverse(),[2,3,7,11,13,17,1])%10;
  var paddedAmount3 = cieUtils.weightedReduce(_.without(_.toArray(input.amount),'.').reverse(),[3,7,11,13,17,1,2])%10;

  var tmp_reference = input.reference + paddedDate + paddedAmount1 + paddedAmount2 + paddedAmount3;

  return {
    reference: tmp_reference,
    amount: '' + paddedAmount1 + paddedAmount2 + paddedAmount3,
    date: paddedDate
  };
};
