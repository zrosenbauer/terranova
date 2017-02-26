(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './utils/terra', './utils/style', './utils/calculations', './utils/events', './utils/features', './Outer', './InfoWindow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./utils/terra'), require('./utils/style'), require('./utils/calculations'), require('./utils/events'), require('./utils/features'), require('./Outer'), require('./InfoWindow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.terra, global.style, global.calculations, global.events, global.features, global.Outer, global.InfoWindow);
    global.index = mod.exports;
  }
})(this, function (exports, _terra, _style, _calculations, _events, _features, _Outer, _InfoWindow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InfoWindow = exports.ens = exports.getEventNamespace = exports.FEATURE_EVENTS = exports.getFeatureProperties = exports.getFeatureByMapId = exports.setFeatureType = exports.getFeatureType = exports.setFeatureState = exports.getFeatureState = exports.getFeatureBounds = exports.clearStylesModifiers = exports.removeStylesModifier = exports.addStylesModifier = exports.latLngToPixel = exports.getDataById = exports.getMapById = undefined;

  var terra = _interopRequireWildcard(_terra);

  var style = _interopRequireWildcard(_style);

  var calc = _interopRequireWildcard(_calculations);

  var events = _interopRequireWildcard(_events);

  var features = _interopRequireWildcard(_features);

  var _Outer2 = _interopRequireDefault(_Outer);

  var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  // Terra
  var getMapById = exports.getMapById = terra.getMapById;
  var getDataById = exports.getDataById = terra.getDataById;

  // Calculations
  var latLngToPixel = exports.latLngToPixel = calc.latLngToPixel;

  // Styles Modifiers
  var addStylesModifier = exports.addStylesModifier = style.addStylesModifier;
  var removeStylesModifier = exports.removeStylesModifier = style.removeStylesModifier;
  var clearStylesModifiers = exports.clearStylesModifiers = style.clearStylesModifiers;

  // Feature
  var getFeatureBounds = exports.getFeatureBounds = features.getFeatureBounds;
  var getFeatureState = exports.getFeatureState = features.getFeatureState;
  var setFeatureState = exports.setFeatureState = features.setFeatureState;
  var getFeatureType = exports.getFeatureType = features.getFeatureType;
  var setFeatureType = exports.setFeatureType = features.setFeatureType;
  var getFeatureByMapId = exports.getFeatureByMapId = features.getFeatureByMapId;
  var getFeatureProperties = exports.getFeatureProperties = features.getFeatureProperties;
  var FEATURE_EVENTS = exports.FEATURE_EVENTS = features.FEATURE_EVENTS;

  // Events
  var getEventNamespace = exports.getEventNamespace = events.getEventNamespace;
  var ens = exports.ens = events.ens;

  var InfoWindow = exports.InfoWindow = _InfoWindow2.default;

  // UI component
  exports.default = _Outer2.default;
});