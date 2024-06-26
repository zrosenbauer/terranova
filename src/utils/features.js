/* @flow */

import isArray from 'lodash/isArray';
import find from 'lodash/find';
import findKey from 'lodash/findKey';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import flatten from 'lodash/flatten';
import uniqueId from 'lodash/uniqueId';

import Data from '../google/maps/Data';
import LatLngBounds from '../google/maps/LatLngBounds';
import LatLng from '../google/maps/LatLng';

import { isServer } from './general';
import {
  terraExists,
  getDataById,
  getTerraById,
} from './terra';
import {
  dispatch,
  ens,
} from './events';
import {
  addStyles,
} from './style';

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
const stateKey: string = uniqueId('@@INTERNAL_terra-nova-state__');

/**
 * @type {String}
 * @private
 */
const typeKey: string = uniqueId('@@INTERNAL_terra-nova-type__');

/**
 * Events that are supported for our features
 * @type {Object}
 */
export const FEATURE_EVENTS = {
  mouseOut: 'mouseout',
  mouseOver: 'mouseover',
  click: 'click',
};

/**
 * Transforms a incoming feature to a valid Data.Feature,
 * as we have to transform to support polygons.
 * @param {Object} feature
 * @param {String} mapId
 * @returns {Data.Feature}
 * @private
 */
function transformToValidFeature(feature: Object, mapId: string): any {
  const { properties, id, type, geometry } = feature;
  const featureType = getFeatureTypeByName(getFeatureTypesByMapId(mapId), type);

  if (isArray(geometry)) {
    return new Data.Feature({
      id,
      properties: {
        ...properties,
        [typeKey]: type,
        [stateKey]: featureType ? featureType.initialState : {},
      },
      geometry: new Data.Polygon(geometry),
    });
  }

  return new Data.Feature({
    id,
    properties: {
      ...properties,
      [typeKey]: type,
      [stateKey]: featureType ? featureType.initialState : {},
    },
    geometry,
  });
}

/**
 * @param {String} id
 * @returns {Object|null}
 */
export function getFeatureTypesByMapId(id: string): ?Object {
  if (!terraExists(id)) {
    return null;
  }

  return getTerraById(id).featureTypes || null;
}

/**
 * @param {Object} featuresTypes
 * @param {String} name
 * @returns {Object|null}
 */
export function getFeatureTypeByName(featuresTypes: ?Object, name: string): ?Object {
  if (!featuresTypes) {
    return null;
  }

  return featuresTypes[name] || null;
}

/**
 * @param {String} mapId
 * @param {String} featureId
 * @returns {Data.Feature}
 */
export function getFeatureByMapId(mapId: string, featureId: string): ?Object {
  if (!terraExists(mapId)) {
    return null;
  }

  return getDataById(mapId).getFeatureById(featureId);
}

/**
 * Gets the properties of a feature and returns them in an
 * object format, it omits the state object.
 * @param {Data.Feature} feature
 * @returns {Object}
 */
export function getFeatureProperties(feature: Object) {
  const result = {};

  if (!feature) {
    return result;
  }

  feature.forEachProperty((value, key) => {
    if (![stateKey, typeKey].includes(key)) {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Gets a features state
 * @param {Data.Feature} feature
 * @returns {Object}
 */
export function getFeatureState(feature: Object): ?Object {
  if (!feature) {
    return null;
  }

  return feature.getProperty(stateKey);
}

/**
 * Sets the state node on a feature
 * @param {Data.Feature} feature
 * @param {Object} nextState
 * @returns {void}
 */
export function setFeatureState(feature: Object, nextState: Object): void {
  if (!isEqual(getFeatureState(feature), nextState)) {
    feature.setProperty(stateKey, {
      ...getFeatureState(feature),
      ...nextState,
    });
  }
}

/**
 * @param {Object} featuresTypes
 * @param {String} name
 * @returns {String}
 */
export function getFeatureType(feature: Object): string {
  if (!feature) {
    return '';
  }

  return feature.getProperty(typeKey);
}

/**
 * Sets the type on a feature
 * @param {Data.Feature} feature
 * @param {String} type
 * @returns {void}
 */
export function setFeatureType(feature: Object, type: string): void {
  if (!isEqual(getFeatureState(feature), type)) {
    feature.setProperty(typeKey, type);
  }
}

/**
 * Updates features, only removes the features that need to be,
 * and adds only what needs to be. Any existing features in the set
 * will not be updated.
 * @param {String} mapId
 * @param {Array} nextFeatures
 * @returns {void}
 */
export function updateFeatures(mapId: string, nextFeatures: Array<Object> = []): void {
  const data = getDataById(mapId);

  // Check if existing features need to be removed
  // and removes them, will skip those that exist in the incoming features
  if (data) {
    data.forEach((feature) => {
      if (!find(nextFeatures, { id: feature.getId() })) {
        data.remove(feature);
      }
    });
  }

  // Add new features, only those that need to be updated will be
  if (nextFeatures && nextFeatures.length) {
    forEach(nextFeatures, (feature) => {
      if (!data.getFeatureById(feature.id)) {
        data.add(transformToValidFeature(feature, mapId));
      }
    });
  }
}

/**
 * Add features blindly to the map
 * @param {String} mapId
 * @param {Array} features
 * @returns {void}
 */
export function addFeatures(mapId: string, features: Array<Object> = []) {
  if (features.length) {
    forEach(features, (feature) => {
      getDataById(mapId).add(transformToValidFeature(feature, mapId));
    });
    addStyles(mapId);
    handleFeatureEvents(mapId);
  }
}

/**
 * Handle feature events by updating state and by
 * also dispatching a Map event
 * @param {String} mapId
 * @returns {void}
 */
export function handleFeatureEvents(mapId: string): void {
  forEach(FEATURE_EVENTS, (eventType) => {
    getDataById(mapId).addListener(eventType, (e) => {
      const { feature } = e;
      const typeName = getFeatureType(feature);
      const type = getFeatureTypeByName(getFeatureTypesByMapId(mapId), typeName);

      if (type) {
        // Update the feature State
        setFeatureState(feature, type.handleEvents(feature, eventType));
      }

      if (typeName) {
        // Dispatch Event to map, public API for interfacing with events on DataLayer
        dispatch(mapId, ens(mapId, eventType, typeName), feature);
      }
    });
  });
}

let unitTestingAddOns = {};

// For usage in Unit Tests
if (isServer() && global.__DEVELOPMENT_ENVIRONMENT__) {
  unitTestingAddOns = {
    typeKey,
    stateKey,
  };
}

// Public Api
export default {
  // --- NOT PUBLIC ---
  ...unitTestingAddOns,
  // --- NOT PUBLIC ---

  // Accessors
  getFeatureTypesByMapId,
  getFeatureTypeByName,
  getFeatureByMapId,
  getFeatureProperties,

  // State
  getFeatureState,
  setFeatureState,

  // Type
  getFeatureType,
  setFeatureType,
}
