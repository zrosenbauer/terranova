import maps from '../google/maps';
import { getMapById } from './terra';

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
export function getEventNamespace(mapId, eventType, type) {
  return `${mapId}.${eventType}.${type}`;
}

/**
 * Proxy to getEventNamespace
 * @returns {String}
 */
export function ens(...args) {
  return getEventNamespace(...args);
}

/**
 * Dispatch (trigger) an event to the map
 * @param {String} mapId
 * @param {String} eventName
 * @param {Data} feature
 * @returns {void}
 * @private
 */
export function dispatchMapEvent(mapId, eventName, feature) {
  maps.event.trigger(getMapById(mapId), eventName, feature);
}

/**
 * Proxy to dispatchMapEvent
 * @returns {void}
 * @private
 */
export function dispatch(...args) {
  dispatchMapEvent(...args);
}

// Public API
export default {
  ens,
  getEventNamespace,
};
