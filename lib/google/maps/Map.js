(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../utils/general', './index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../utils/general'), require('./index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.general, global.index);
    global.Map = mod.exports;
  }
})(this, function (exports, _general, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _index2 = _interopRequireDefault(_index);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // google/maps/Map Module
  // ------------------------------------
  // Map module, handles a proxy to the
  // google.maps.Map constructor, that
  // will throw errors on the server.
  // ------------------------------------

  var Map = null;

  if ((0, _general.isClient)() && _index2.default.Map) {
    Map = _index2.default.Map;
  } else {
    Map = function Map() {
      console.log('her', (0, _general.isClient)());
      throw new Error('Cannot instantiate Map until in the client or google.maps is loaded!');
    };
  }

  exports.default = Map;
});