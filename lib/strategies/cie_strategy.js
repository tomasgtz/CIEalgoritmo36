'use strict';

var CIEStrategy = function() {};

CIEStrategy.prototype = {
  execute: function() {
    throw new Error('CIEStrategy#execute needs to be overridden.');
  }
};

module.exports.CIEStrategy = CIEStrategy;
