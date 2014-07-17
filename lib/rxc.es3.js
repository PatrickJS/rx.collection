;(function(global, Rx, _) {
  'use strict';

  var array = [];
  // var push = array.push;
  var slice = array.slice;
  // var splice = array.splice;
  //
  global.rxc = global.ReactiveCollection = {};

  function Model() {

  }

  function Collection() {

  }

  Model.prototype.new = function() {
    var args = arguments;
    var constructor = this;
    function Fake() {
       constructor.apply(this, args);
    }
    Fake.prototype = constructor.prototype;
    return (new Fake).apply(this, arguments);
  };


  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Observable
  var inherit = function(protoProps, staticProps) {
    var parent = this;
    var child;

    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    /* jshint ignore:start */
    child.prototype = new Surrogate;
    /* jshint ignore:end */

    if (protoProps) _.extend(child.prototype, protoProps);

    child.__super__ = parent.prototype;

    return child;
  };

}(window, window.Rx, window._));