(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.general = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isClient = isClient;
  exports.isServer = isServer;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  // General Module
  // ------------------------------------
  // Another case of poor naming, but this
  // modules is correctly named in that
  // it contains only general utils.
  // ------------------------------------

  /**
   * Returns true on client,
   * @returns {Boolean}
   */
  function isClient() {
    return typeof window !== 'undefined';
  }

  /**
   * Returns true on server,
   * @returns {Boolean}
   */
  function isServer() {
    return (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object';
  }

  // Public Api
  exports.default = {
    isClient: isClient,
    isServer: isServer
  };
});