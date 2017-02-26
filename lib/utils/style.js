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
  exports.getStylesModifiers = getStylesModifiers;
  exports.addStylesModifier = addStylesModifier;
  exports.removeStylesModifier = removeStylesModifier;
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
   * Gets the setStyles callbacks array
   * @param {String} mapId
   * @returns {Array<Function>}
   */
  function getStylesModifiers(mapId) {
    if (!(0, _terra.terraExists)(mapId)) {
      return [];
    }

    return (0, _terra.getTerraById)(mapId).stylesModifiers;
  }

  /**
   * Adds a setStyle function that will
   * override default type based styling
   * @param {String} mapId
   * @param {Function} setStyle
   */
  function addStylesModifier(mapId, setStyle) {
    if ((0, _terra.terraExists)(mapId)) {
      var index = getSetStyleIndex(mapId, setStyle);

      if (index === -1) {
        (0, _terra.getTerraById)(mapId).stylesModifiers.push(setStyle);
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
    if ((0, _terra.terraExists)(mapId)) {
      var index = getSetStyleIndex(mapId, setStyle);

      if (index !== -1) {
        (0, _pullAt2.default)(getStylesModifiers(mapId), index);
      }
    }
  }

  /**
   * Clears the setStyles array
   * @param {String} mapId
   * @returns {void}
   */
  function clearStylesModifiers(mapId) {
    if ((0, _terra.terraExists)(mapId)) {
      (0, _terra.getTerraById)(mapId).stylesModifiers = [];
    }
  }

  /**
   * @param {String} mapId
   * @returns {void}
   * @private
   */
  function addStyles(mapId) {
    var featureTypes = (0, _features.getFeatureTypesByMapId)(mapId);

    (0, _terra.getDataById)(mapId).setStyle(function (feature) {
      var type = (0, _features.getFeatureTypeByName)(featureTypes, (0, _features.getFeatureType)(feature));

      // Allow custom overrides,
      // we will exit forEach once one of the
      // setStyle functions returns a style object
      var customOverride = null;
      var stylesModifiers = getStylesModifiers(mapId);
      if (stylesModifiers.length) {
        var counter = 0;
        var exit = false;

        while (counter < stylesModifiers.length && !exit) {
          customOverride = stylesModifiers[counter](feature);
          counter++;

          if (customOverride) {
            exit = true;
          }
        }
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

  // Public Api
  exports.default = {
    getStylesModifiers: getStylesModifiers,
    addStylesModifier: addStylesModifier,
    removeStylesModifier: removeStylesModifier,
    clearStylesModifiers: clearStylesModifiers
  };
});