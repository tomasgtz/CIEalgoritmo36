'use strict';

var _ = require('underscore');

var CIEUtils = function() {};

CIEUtils.prototype = {
  nearestMultipleOf: function(val, base) {
    return (Math.floor(val/base) + 1)*base;
  },
  sequentialAdd:   function(input) {
    return _.reduce(input.toString(), function(memo,num) { return memo + parseInt(num); }, 0);
  },
  replaceCharWithNum: function(input, charToNum) {
    return _.map(input, function(x) { return charToNum[x];});
  },
  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },
  validateLength: function(field, min, max) {
    return (field.length >= min && field.length <= max);
  },
  weightedReduce: function(input, weights, debug) {
    var acc =0;
    for (var i = 0; i < input.length; i++) {
      if (debug)
        {
          console.log('input: ' + input[i] + ' w: ' + weights[i%weights.length] + ' = ' + parseInt(input[i] * weights[i%weights.length]));
        }
      acc += parseInt(input[i] * weights[i%weights.length]);
    }
    return acc;
  },
  sequentialWeightedReduce: function(input, weights, debug) {
    var acc =0;
    for (var i = 0; i < input.length; i++) {
      if (debug)
        {
          console.log('input: ' + input[i] + ' w: ' + weights[i%weights.length] + ' = ' + CIEUtils.prototype.sequentialAdd(parseInt(input[i] * weights[i%weights.length])));
        }

      var tmp = CIEUtils.prototype.sequentialAdd(parseInt(input[i] * weights[i%weights.length]));

      while(tmp.toString().length !== 1) {
        tmp = CIEUtils.prototype.sequentialAdd(tmp);
      }
      acc += tmp;
    }
    return acc;
  },
  validateInput:  function(input, validationRules) {
    var validateLengths = function(input, validationRules) {
      return _.reduce(_.keys(validationRules), function(memo, k) {
        return memo && CIEUtils.prototype.validateLength(input[k], validationRules[k].length.min, validationRules[k].length.max);
      }, true);
    };
    return validateLengths(input,validationRules);
  }
};

module.exports.CIEUtils = CIEUtils;
