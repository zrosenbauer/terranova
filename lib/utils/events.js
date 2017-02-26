(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../google/maps', './terra'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../google/maps'), require('./terra'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.maps, global.terra);
    global.events = mod.exports;
  }
})(this, function (exports, _maps, _terra) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getEventNamespace = getEventNamespace;
  exports.ens = ens;
  exports.dispatchMapEvent = dispatchMapEvent;
  exports.dispatch = dispatch;

  var _maps2 = _interopRequireDefault(_maps);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Events Module
  // ------------------------------------
  // Handles all events with-in terra, all
  // events are namespaced to prevent
  // clashes. Proxies are provied as
  // needed for simplicity's sake
  // ------------------------------------

  /**
   * Builds a event space name based on the eventType, type and map-id
   * @param {String} mapId
   * @param {String} eventType
   * @param {String} type
   * @returns {String}
   */
  function getEventNamespace(mapId, eventType, type) {
    return mapId + '.' + eventType + '.' + type;
  }

  /**
   * Proxy to getEventNamespace
   * @returns {String}
   */
  function ens() {
    return getEventNamespace.apply(undefined, arguments);
  }

  /**
   * Dispatch (trigger) an event to the map
   * @param {String} mapId
   * @param {String} eventName
   * @param {Data} feature
   * @returns {void}
   * @private
   */
  function dispatchMapEvent(mapId, eventName, feature) {
    _maps2.default.event.trigger((0, _terra.getMapById)(mapId), eventName, feature);
  }

  /**
   * Proxy to dispatchMapEvent
   * @returns {void}
   * @private
   */
  function dispatch() {
    dispatchMapEvent.apply(undefined, arguments);
  }

  // Public API
  exports.default = {
    ens: ens,
    getEventNamespace: getEventNamespace
  };
});