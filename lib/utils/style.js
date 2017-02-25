(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/forEach', 'lodash/findIndex', 'lodash/pullAt', './terra', './features'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/forEach'), require('lodash/findIndex'), require('lodash/pullAt'), require('./terra'), require('./features'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.forEach, global.findIndex, global.pullAt, global.terra, global.features);
    global.style = mod.exports;
  }
})(this, function (exports, _forEach, _findIndex, _pullAt, _terra, _features) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.addStylesModifier = addStylesModifier;
  exports.removeStylesModifier = removeStylesModifier;
  exports.getStylesModifiers = getStylesModifiers;
  exports.clearStylesModifiers = clearStylesModifiers;
  exports.addStyles = addStyles;

  var _forEach2 = _interopRequireDefault(_forEach);

  var _findIndex2 = _interopRequireDefault(_findIndex);

  var _pullAt2 = _interopRequireDefault(_pullAt);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Styles Module
  // ------------------------------------
  // Handles all events with-in terra, all
  // events are namespaced to prevent
  // clashes. Proxies are provied as
  // needed for simplicity's sake
  // ------------------------------------

  /**
   * Gets the setStyle function index, by value
   * @param {String} mapId
   * @param {Function} setStyle
   * @returns {Number}
   * @private
   */
  function getSetStyleIndex(mapId, setStyle) {
    return (0, _findIndex2.default)((0, _terra.getTerraById)(mapId).stylesModifiers, function (cb) {
      return cb === setStyle;
    });
  }

  /**
   * Adds a setStyle function to a that will override
   * default type based styling
   * @param {String} mapId
   * @param {Function} setStyle
   */
  function addStylesModifier(mapId, setStyle) {
    if ((0, _terra.mapExists)(mapId)) {
      var index = getSetStyleIndex(mapId, setStyle);

      if (index !== -1) {
        (0, _terra.getTerraById)(mapId).stylesModifiers[index] = setStyle;
      } else {
        (0, _terra.getTerraById)(mapId).stylesModifiers = (0, _terra.getTerraById)(mapId).stylesModifiers.push(setStyle);
      }
    }
  }

  /**
   * Removes a setStyle function, the setStyle function must be a named function, otherwise we will
   * not be able to do a value compare and remove!
   * @param {String} mapId
   * @param {Function} setStyle
   */
  function removeStylesModifier(mapId, setStyle) {
    if ((0, _terra.mapExists)(mapId)) {
      var index = getSetStyleIndex(mapId, setStyle);

      if (index !== -1) {
        (0, _pullAt2.default)(getStylesModifiers(mapId), index);
      }
    }
  }

  /**
   * Gets the setStyles callbacks array
   * @param {String} mapId
   * @returns {Array<Function>}
   */
  function getStylesModifiers(mapId) {
    if (!(0, _terra.mapExists)(mapId)) {
      return [];
    }

    return (0, _terra.getTerraById)(mapId).stylesModifiers;
  }

  /**
   * Clears the setStyles array
   * @param {String} mapId
   * @returns {void}
   */
  function clearStylesModifiers(mapId) {
    if ((0, _terra.mapExists)(mapId)) {
      (0, _terra.getTerraById)(mapId).stylesModifiers = [];
    }
  }

  /**
   * @param {String} mapId
   * @returns {void}
   * @private
   */
  function addStyles(mapId) {
    var featureStyles = (0, _features.getFeatureTypesByMapId)(mapId);

    (0, _terra.getDataByMapId)(mapId).setStyle(function (feature) {
      var type = (0, _features.getFeatureTypeByName)(featureStyles, (0, _features.getFeatureType)(feature));

      // Allow custom overrides,
      // we will exit forEach once one of the
      // setStyle functions returns a style object
      var customOverride = null;
      var stylesModifiers = getStylesModifiers(mapId);
      if (stylesModifiers.length) {
        (0, _forEach2.default)(stylesModifiers, function (setStyle) {
          customOverride = setStyle(feature);

          if (customOverride) {
            return;
          }
        });
      }

      if (customOverride) {
        return customOverride;
      }

      if (type) {
        return type.getStyles(feature);
      }

      return null;
    });
  }
});