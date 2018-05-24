'use strict';

var _ = require('underscore');
var CIEStrategy = require('./cie_strategy.js').CIEStrategy;
var CIEUtils = require('./cie_utils.js').CIEUtils;
var cieUtils = new CIEUtils();

var Alg06 = function() {};

Alg06.prototype = new CIEStrategy();
Alg06.prototype = {
  execute: function(input) {
    var validationRules = {
      reference: {length: {min: 1,max: 18}},
      branch: {length: {min: 1,max: 8}},
      account: {length: {min: 1,max: 8}}
    };
    if (!cieUtils.validateInput(input,validationRules )) {
      throw new Error('Longitud invalida');
    }
    var reference = parseInput(input);
    var acc = cieUtils.weightedReduce(reference,[37,31,29,23,19,17,13,11]);

    return input.reference + (99 - (acc % 97));
  }
};

module.exports.Alg06 = Alg06;

// TODO Maybe move this to a template?
var parseInput = function(input) {
  var paddedBranch = _.toArray(cieUtils.pad(input.branch,8));
  var paddedAccount= _.toArray(cieUtils.pad(input.account,8));
  var paddedReference= _.last(cieUtils.pad(input.reference,8), 8);
  return paddedBranch.concat(paddedAccount, paddedReference).reverse();
};
