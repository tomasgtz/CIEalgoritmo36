
'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg04 = function() {};

Alg04.prototype = new CIEStrategy();
Alg04.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 18}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      throw new Error('Longitud invalida');
    }

    var reference =  parseInput(input);
    var acc = cieUtils.weightedReduce(reference, [11,13,17,19,23]) - reference[0]*11;
    return input.reference + cieUtils.pad(((acc + 330)%97)+1,2);
  }
};

module.exports.Alg04 = Alg04;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  return _.toArray(input.reference).reverse();
};

