(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var maps = null;

  // google/maps Module
  // ------------------------------------
  // maps module, handles a proxy to the
  // google.maps object, on the server we
  // don't throw an error, cause imports.
  // ------------------------------------

  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    maps = window.google.maps;
  } else {
    maps = {};
  }

  exports.default = maps;
});