'use strict';

var CIECalculator = function () {
  this.strategy = '';
};

CIECalculator.prototype = {
  setStrategy: function(strategy) {
    this.strategy = strategy;
  },
  execute: function(reference) {
    return this.strategy.execute(reference);
  }
};

module.exports.CIECalculator = CIECalculator;
