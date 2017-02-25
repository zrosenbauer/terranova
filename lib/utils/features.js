(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isArray', 'lodash/find', 'lodash/findKey', 'lodash/isEqual', 'lodash/forEach', 'lodash/flatten', 'lodash/uniqueId', '../google/maps/Data', '../google/maps/LatLngBounds', '../google/maps/LatLng', './terra', './events', './style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isArray'), require('lodash/find'), require('lodash/findKey'), require('lodash/isEqual'), require('lodash/forEach'), require('lodash/flatten'), require('lodash/uniqueId'), require('../google/maps/Data'), require('../google/maps/LatLngBounds'), require('../google/maps/LatLng'), require('./terra'), require('./events'), require('./style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isArray, global.find, global.findKey, global.isEqual, global.forEach, global.flatten, global.uniqueId, global.Data, global.LatLngBounds, global.LatLng, global.terra, global.events, global.style);
    global.features = mod.exports;
  }
})(this, function (exports, _isArray, _find, _findKey, _isEqual, _forEach, _flatten, _uniqueId, _Data, _LatLngBounds, _LatLng, _terra, _events, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FEATURE_EVENTS = undefined;
  exports.handleFeatureEvents = handleFeatureEvents;
  exports.getFeatureTypesByMapId = getFeatureTypesByMapId;
  exports.getFeatureTypeByName = getFeatureTypeByName;
  exports.getFeatureType = getFeatureType;
  exports.getFeatureByMapId = getFeatureByMapId;
  exports.getFeatureState = getFeatureState;
  exports.setFeatureState = setFeatureState;
  exports.setFeatureType = setFeatureType;
  exports.updateFeatures = updateFeatures;
  exports.addFeatures = addFeatures;
  exports.getFeatureProperties = getFeatureProperties;
  exports.getFeatureBounds = getFeatureBounds;

  var _isArray2 = _interopRequireDefault(_isArray);

  var _find2 = _interopRequireDefault(_find);

  var _findKey2 = _interopRequireDefault(_findKey);

  var _isEqual2 = _interopRequireDefault(_isEqual);

  var _forEach2 = _interopRequireDefault(_forEach);

  var _flatten2 = _interopRequireDefault(_flatten);

  var _uniqueId2 = _interopRequireDefault(_uniqueId);

  var _Data2 = _interopRequireDefault(_Data);

  var _LatLngBounds2 = _interopRequireDefault(_LatLngBounds);

  var _LatLng2 = _interopRequireDefault(_LatLng);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  // Features Module
  // ------------------------------------
  // Features are the meat of TerraNova,
  // features can be any supported
  // Data.Feature (for the most part).
  // ------------------------------------

  /**
   * @type {String}
   * @private
   */
  var stateKey = (0, _uniqueId2.default)('@@INTERNAL_terra-nova-state__');

  /**
   * @type {String}
   * @private
   */
  var typeKey = (0, _uniqueId2.default)('@@INTERNAL_terra-nova-type__');

  /**
   * Events that are supported for our features
   * @type {Object}
   */
  var FEATURE_EVENTS = exports.FEATURE_EVENTS = {
    mouseOut: 'mouseout',
    mouseOver: 'mouseover',
    click: 'click'
  };

  /**
   * Handle feature events by updating state and by
   * also dispatching a Map event
   * @param {String} mapId
   * @returns {void}
   */
  function handleFeatureEvents(mapId) {
    (0, _forEach2.default)(FEATURE_EVENTS, function (eventType) {
      (0, _terra.getDataByMapId)(mapId).addListener(eventType, function (e) {
        var feature = e.feature;

        var typeName = getFeatureType(feature);
        var type = getFeatureTypeByName(getFeatureTypesByMapId(mapId), typeName);

        // Update the feature State
        setFeatureState(feature, type.handleEvents(feature, eventType));

        // Dispatch Event to map, public API for interfacing with events on DataLayer
        (0, _events.dispatch)(mapId, (0, _events.ens)(mapId, eventType, typeName), feature);
      });
    });
  }

  /**
   * @param {String} id
   * @returns {Object|null}
   */
  function getFeatureTypesByMapId(id) {
    if (!(0, _terra.mapExists)(id)) {
      return null;
    }

    return (0, _terra.getTerraById)(id).featureTypes || null;
  }

  /**
   * @param {Object} featuresTypes
   * @param {String} name
   * @returns {Object|null}
   */
  function getFeatureTypeByName(featuresTypes, name) {
    if (!featuresTypes) {
      return null;
    }

    return featuresTypes[(0, _findKey2.default)(featuresTypes, { name: name })] || null;
  }

  /**
   * @param {Object} featuresTypes
   * @param {String} name
   * @returns {String}
   */
  function getFeatureType(feature) {
    if (!feature) {
      return '';
    }

    return feature.getProperty(typeKey);
  }

  /**
   * @param {String} mapId
   * @param {String} featureId
   * @returns {Data.Feature}
   */
  function getFeatureByMapId(mapId, featureId) {
    if (!(0, _terra.mapExists)(mapId)) {
      return null;
    }

    return (0, _terra.getDataByMapId)(mapId).getFeatureById(featureId);
  }

  /**
   * Gets a features state
   * @param {Data.Feature} feature
   * @returns {Object}
   */
  function getFeatureState(feature) {
    return feature.getProperty(stateKey);
  }

  /**
   * Sets the state node on a feature
   * @param {Data.Feature} feature
   * @param {Object} nextState
   * @returns {void}
   */
  function setFeatureState(feature, nextState) {
    if (!(0, _isEqual2.default)(getFeatureState(feature), nextState)) {
      feature.setProperty(stateKey, _extends({}, getFeatureState(feature), nextState));
    }
  }

  /**
   * Sets the type on a feature
   * @param {Data.Feature} feature
   * @param {String} type
   * @returns {void}
   */
  function setFeatureType(feature, type) {
    if (getFeatureType(feature) === type) {
      feature.setProperty(typeKey, type);
    }
  }

  /**
   * Transforms a incoming feature to a valid Data.Feature,
   * as we have to transform to support polygons.
   * @param {Object} feature
   * @param {String} mapId
   * @returns {Data.Feature}
   * @private
   */
  function transformToValidFeature(feature, mapId) {
    var _extends3;

    var properties = feature.properties,
        id = feature.id,
        type = feature.type,
        geometry = feature.geometry;

    var featureType = getFeatureTypeByName(getFeatureTypesByMapId(mapId), type);

    if ((0, _isArray2.default)(geometry)) {
      var _extends2;

      return new _Data2.default.Feature({
        id: id,
        properties: _extends({}, properties, (_extends2 = {}, _defineProperty(_extends2, typeKey, type), _defineProperty(_extends2, stateKey, featureType.initialState), _extends2)),
        geometry: new _Data2.default.Polygon(geometry)
      });
    }

    return new _Data2.default.Feature({
      id: id,
      properties: _extends({}, properties, (_extends3 = {}, _defineProperty(_extends3, typeKey, type), _defineProperty(_extends3, stateKey, featureType.initialState), _extends3)),
      geometry: geometry
    });
  }

  /**
   * Updates features, only removes the features that need to be,
   * and adds only what needs to be. Any existing features in the set
   * will not be updated.
   * @param {String} mapId
   * @param {Array} nextFeatures
   * @returns {void}
   */
  function updateFeatures(mapId) {
    var nextFeatures = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var data = (0, _terra.getDataByMapId)(mapId);

    // Check if existing features need to be removed
    // and removes them, will skip those that exist in the incoming features
    data.forEach(function (feature) {
      if (!(0, _find2.default)(nextFeatures, { id: feature.getId() })) {
        data.remove(feature);
      }
    });

    // Add new features, only those that need to be updated will be
    (0, _forEach2.default)(nextFeatures, function (feature) {
      if (data.getFeatureById(feature.id)) {
        return;
      }
      data.add(transformToValidFeature(feature, mapId));
    });
  }

  /**
   * Add features blindly to the map
   * @param {String} mapId
   * @param {Array} features
   * @returns {void}
   */
  function addFeatures(mapId) {
    var features = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (features.length) {
      (0, _forEach2.default)(features, function (feature) {
        (0, _terra.getDataByMapId)(mapId).add(transformToValidFeature(feature, mapId));
      });
      (0, _style.addStyles)(mapId);
      handleFeatureEvents(mapId);
    }
  }

  /**
   * Gets the properties of a feature and returns them in an
   * object format, it omits the state object.
   * @param {Data.Feature} feature
   * @returns {Object}
   */
  function getFeatureProperties(feature) {
    var result = {};

    if (!feature) {
      return result;
    }

    feature.forEachProperty(function (value, key) {
      if (![stateKey, typeKey].includes(key)) {
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * Gets the map bounds based on an array of features
   * @param {Array<window.google.maps.Data.Feature>} features
   * @param {String} featureType
   * @returns {window.google.maps.LatLngBounds}
   */
  function getFeatureBounds(features, featureType) {
    var mapBounds = new _LatLngBounds2.default();

    (0, _forEach2.default)(features, function (_ref) {
      var properties = _ref.properties,
          geometry = _ref.geometry;

      if (featureType === properties.type) {
        if ((0, _isArray2.default)(geometry)) {
          (0, _forEach2.default)((0, _flatten2.default)(geometry), function (geo) {
            mapBounds.extend(new _LatLng2.default(geo));
          });
        } else {
          mapBounds.extend(new _LatLng2.default(geometry));
        }
      }
    });

    return mapBounds;
  }
});