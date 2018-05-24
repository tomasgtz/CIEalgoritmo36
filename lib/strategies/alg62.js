'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg62 = function() {};

Alg62.prototype = new CIEStrategy();
Alg62.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 10}},
      date: {length: {min: 8,max: 8}},
      amount: {length: {min: 1,max: 12}}
    };
    if (!cieUtils.validateInput(input,validationRules )) {
      throw new Error('Longitud invalida');
    }
    var condensedInput = parseInput(input);

    return input.reference + condensedInput.date + condensedInput.amount + '2';
  }
};

module.exports.Alg62 = Alg62;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  var paddedDate = cieUtils.pad((input.date.substr(4,4)-1988)*372 + (input.date.substr(2,2)-1)*31 + (input.date.substr(0,2)-1),4);
  var expandedAmount = fooAmount(_.without(_.toArray(input.amount),'.'));
  var reducedAmount = weightedReduceWithMult(_.toArray(expandedAmount).reverse(),[7,3,1]);

  return {
    reference: _.toArray(input.reference + paddedDate + reducedAmount + '2').reverse(),
    amount: reducedAmount,
    date: paddedDate
  };
};

var fooAmount = function(amount) {
  return _.reduce(amount, function(memo, num) {
    var x = (memo.length < 8) ? (num + (parseInt(num)+1)) + '' : num;
    return memo + x;
  },'')
};

var weightedReduceWithMult = function(input, weights, debug) {
  var acc = 0;
  var acc2 = '';
  for (var i = 0; i < input.length; i++) {
    if (debug)
      {
        console.log('input: ' + input[i] + ' w: ' + weights[i%weights.length] + ' = ' + parseInt(input[i] * weights[i%weights.length]));
      }
      acc += parseInt(input[i] * weights[i%weights.length]);
      acc = cieUtils.sequentialAdd(acc);
      if (parseInt(i) % 3 == 2) {
        acc2 += acc % 10;
      }
  }
  return acc2;
};
