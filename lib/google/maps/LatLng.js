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
    global.LatLng = mod.exports;
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

  // google/maps/LatLng Module
  // ------------------------------------
  // LatLng module, handles a proxy to the
  // google.maps.LatLng constructor, that
  // will throw errors on the server.
  // ------------------------------------

  var LatLng = null;

  if ((0, _general.isClient)() && _index2.default.LatLng) {
    LatLng = _index2.default.LatLng;
  } else {
    LatLng = function LatLng() {
      throw new Error('Cannot instantiate LatLng until in the client or google.maps is loaded!');
    };
  }

  exports.default = LatLng;
});