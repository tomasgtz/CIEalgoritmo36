'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg03 = function() {};

Alg03.prototype = new CIEStrategy();
Alg03.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 19}}
    };
    if (!cieUtils.validateInput(input, validationRules)) {
      throw new Error('Longitud invalida');
    }

    var acc = 0;
    var reference = parseInput(input);
    for(var i = 0; i < reference.length; i++) {
      acc += parseInt(reference[i],10) * (i + 2);
    }
    return input.reference + (7-(acc % 7));
  }
};

module.exports.Alg03 = Alg03;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  return _.last(input.reference,6).reverse();
};
