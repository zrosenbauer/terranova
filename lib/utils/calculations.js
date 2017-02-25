(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../google/maps/Point'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../google/maps/Point'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Point);
    global.calculations = mod.exports;
  }
})(this, function (exports, _Point) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.latLngToPixel = latLngToPixel;

  var _Point2 = _interopRequireDefault(_Point);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  // Calculations Module
  // ------------------------------------
  // Apologize for the poor naming or the
  // accurate naming, but naming is a
  // bit difficult at times. Calc's
  // modules handles and calcs!
  // ------------------------------------

  /**
   * Calculates the point based on the map
   * scale and bounds
   * @param {window.google.maps.Point} point
   * @param {Object} bounds
   * @param {Number} scale
   * @returns {[Number,Number]}
   * @private
   */
  function calculatePointWithScale(point, bounds, scale) {
    return [(point.x - bounds.bl.x) * scale, (point.y - bounds.tr.y) * scale];
  }

  /**
   * Converts a LatLng to a pixel (maps.Point) using the
   * map projection as its basis
   * @param {window.google.maps.Map} map
   * @param {window.google.maps.LatLng} latLng
   * @returns {window.google.maps.Point}
   */
  function latLngToPixel(map, latLng) {
    var projection = map.getProjection();
    var bounds = map.getBounds();
    var scale = Math.pow(2, map.getZoom());
    var mapBounds = {
      tr: projection.fromLatLngToPoint(bounds.getNorthEast()),
      bl: projection.fromLatLngToPoint(bounds.getSouthWest())
    };
    var point = projection.fromLatLngToPoint(latLng);

    return new (Function.prototype.bind.apply(_Point2.default, [null].concat(_toConsumableArray(calculatePointWithScale(point, mapBounds, scale)))))();
  }

  // Public Api
  exports.default = {
    latLngToPixel: latLngToPixel
  };
});