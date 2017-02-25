import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import pullAt from 'lodash/pullAt';

import {
  mapExists,
  getTerraById,
  getDataByMapId,
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
function getSetStyleIndex(mapId, setStyle) {
  return findIndex(getTerraById(mapId).stylesModifiers, (cb) => cb === setStyle);
}

/**
 * Adds a setStyle function to a that will override
 * default type based styling
 * @param {String} mapId
 * @param {Function} setStyle
 */
export function addStylesModifier(mapId, setStyle) {
  if (mapExists(mapId)) {
    const index = getSetStyleIndex(mapId, setStyle);

    if (index !== -1) {
      getTerraById(mapId).stylesModifiers[index] = setStyle;
    } else {
      getTerraById(mapId).stylesModifiers = getTerraById(mapId).stylesModifiers.push(setStyle);
    }
  }
}

/**
 * Removes a setStyle function, the setStyle function must be a named function, otherwise we will
 * not be able to do a value compare and remove!
 * @param {String} mapId
 * @param {Function} setStyle
 */
export function removeStylesModifier(mapId, setStyle) {
  if (mapExists(mapId)) {
    const index = getSetStyleIndex(mapId, setStyle);

    if (index !== -1) {
      pullAt(getStylesModifiers(mapId), index);
    }
  }
}

/**
 * Gets the setStyles callbacks array
 * @param {String} mapId
 * @returns {Array<Function>}
 */
export function getStylesModifiers(mapId) {
  if (!mapExists(mapId)) {
    return [];
  }

  return getTerraById(mapId).stylesModifiers;
}

/**
 * Clears the setStyles array
 * @param {String} mapId
 * @returns {void}
 */
export function clearStylesModifiers(mapId) {
  if (mapExists(mapId)) {
    getTerraById(mapId).stylesModifiers = [];
  }
}

/**
 * @param {String} mapId
 * @returns {void}
 * @private
 */
export function addStyles(mapId) {
  const featureStyles = getFeatureTypesByMapId(mapId);

  getDataByMapId(mapId).setStyle((feature) => {
    const type = getFeatureTypeByName(featureStyles, getFeatureType(feature));

    // Allow custom overrides,
    // we will exit forEach once one of the
    // setStyle functions returns a style object
    let customOverride = null;
    const stylesModifiers = getStylesModifiers(mapId);
    if (stylesModifiers.length) {
      forEach(stylesModifiers, (setStyle) => {
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
