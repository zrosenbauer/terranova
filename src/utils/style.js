/* @flow */

import findIndex from 'lodash/findIndex';
import pullAt from 'lodash/pullAt';

import {
  terraExists,
  getTerraById,
  getDataById,
} from './terra';
import {
  getFeatureTypesByMapId,
  getFeatureTypeByName,
  getFeatureType,
} from './features';

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
function getSetStyleIndex(mapId: string, setStyle: Function): number {
  return findIndex(getTerraById(mapId).stylesModifiers, (cb) => cb === setStyle);
}

/**
 * Gets the setStyles callbacks array
 * @param {String} mapId
 * @returns {Array<Function>}
 */
export function getStylesModifiers(mapId: string): Array<Function> {
  if (!terraExists(mapId)) {
    return [];
  }

  return getTerraById(mapId).stylesModifiers;
}

/**
 * Adds a setStyle function that will
 * override default type based styling
 * @param {String} mapId
 * @param {Function} setStyle
 * @returns {void}
 */
export function addStylesModifier(mapId: string, setStyle: Function): void {
  if (terraExists(mapId)) {
    const index = getSetStyleIndex(mapId, setStyle);

    if (index === -1) {
      getTerraById(mapId).stylesModifiers.push(setStyle);
    }
  }
}

/**
 * Removes a setStyle function, the setStyle function must be a named function, otherwise we will
 * not be able to do a value compare and remove!
 * @param {String} mapId
 * @param {Function} setStyle
 * @returns {void}
 */
export function removeStylesModifier(mapId: string, setStyle: Function): void {
  if (terraExists(mapId)) {
    const index = getSetStyleIndex(mapId, setStyle);

    if (index !== -1) {
      pullAt(getStylesModifiers(mapId), index);
    }
  }
}

/**
 * Clears the setStyles array
 * @param {String} mapId
 * @returns {void}
 */
export function clearStylesModifiers(mapId: string): void {
  if (terraExists(mapId)) {
    getTerraById(mapId).stylesModifiers = [];
  }
}

/**
 * @param {String} mapId
 * @returns {void}
 * @private
 */
export function addStyles(mapId: string): void {
  const featureTypes = getFeatureTypesByMapId(mapId);

  getDataById(mapId).setStyle((feature) => {
    const type = getFeatureTypeByName(featureTypes, getFeatureType(feature));

    // Allow custom overrides,
    // we will exit forEach once one of the
    // setStyle functions returns a style object
    let customOverride = null;
    const stylesModifiers = getStylesModifiers(mapId);
    if (stylesModifiers.length) {
      let counter = 0;
      let exit = false;

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
export default {
  getStylesModifiers,
  addStylesModifier,
  removeStylesModifier,
  clearStylesModifiers,
}
