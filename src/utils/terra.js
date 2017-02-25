/*
  .---. .----..----. .----.   .--.  .-. .-. .----. .-. .-.  .--.
 {_   _}| {_  | {}  }| {}  } / {} \ |  `| |/  {}  \| | | | / {} \
   | |  | {__ | .-. \| .-. \/  /\  \| |\  |\      /\ \_/ //  /\  \
   `-'  `----'`-' `-'`-' `-'`-'  `-'`-' `-' `----'  `---' `-'  `-'

                           @@@@@@@@@@@@@@@@@@@
                       @@@@@@@              @@@@@@@
                    @@@@@                        @@@@@
                  @@@                               @@@@
               @@@@                                    @@@
              @@                                         @@@
            @@@                                            @@
           @@     @@@@                                   @@ @@@
          @@  @@@@@@                                      @@  @@
         @@ @@@@@                   @     @@@@             @@  @@
        @@ @@@@                    @             @@@@@@    @@@  @@
       @@ @@@@@                  @@@@@@@@@     @@@@@@@@ @@@@@@@  @@
      @@  @@@@                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@
      @@ @@                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@
     @@ @@@                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@
     @@  @@@@                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@
     @  @@@@@@@@@             @@@@@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@ @@
     @  @@@@@@@@@@@@             @@  @@@@@@@@@@@@@@@@@@@@@@@   @@@ @@
     @  @@@@@@@@@@@@@                 @@@@@@@@@@@@@@@@@@ @@   @@   @@
     @  @@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@     @@@@@   @@
     @  @@@@@@@@@@@@@@@@               @@@@@@@@@@@@@@    @@ @@     @@
     @  @@@@@@@@@@@@@@                 @@@@@@@@@@@@@     @@        @@
     @@  @@@@@@@@@@@@                  @@@@@@@@@@@       @@@@@    @@@
      @  @@@@@@@@@@@         @ @        @@@@@@@@@@       @@@@@@@  @@
      @@  @@@@@@                         @@@@@@@@        @@@@@@@  @@
       @@ @@@@@                          @@@@@       @@  @@@@@@  @@
        @  @@@                                       @@     @   @@
        @@  @@                                                 @@
         @@  @@                                               @@
           @@  @                                             @@
            @@                                             @@@
             @@@                                          @@@
               @@@                                      @@@
                 @@@                                 @@@@
                   @@@@    @@@@@@@   @@           @@@@@
                      @@@@@@  @@@@@@@@@@@@@@  @@@@@@
                         @@@@@@@@@@@@@@@@@@@@@@@@
                                @@@@@@@@@@

*/

import GoogleMaps from '../google/maps/Map';``
import Data from '../google/maps/Data';

// Terra Module
// ------------------------------------
// Terra is our core map, and the basis
// of all things Terra Nova.
// ------------------------------------

/**
 * Terra Namespacing object, each map will be added as a node
 * based on the id provided. The node shape will be as such:
 * node: {
 *   map: Maps // instance of the map
 *   featureTypes: Object // featureTypes associated to this map instance
 *   stylesModifiers: Array // functions that will modify and override base configured styles
 * }
 * This allows dev to add differing featureTypes per map instance
 * @type {Object}
 */
const terra = {};

// Methods
// -----------------

/**
 * Check if the map exists
 * @param {String} id
 * @returns {Boolean}
 */
export function mapExists(id) {
  return Boolean(terra[id]);
}

// Getters
// ----------

/**
 * @param {String} id
 * @returns {Maps|null}
 */
export function getTerraById(id) {
  if (!mapExists(id)) {
    return null;
  }

  return terra[id] || null;
}

/**
 * @param {String} id
 * @returns {Maps|null}
 */
export function getMapById(id) {
  if (!mapExists(id)) {
    return null;
  }

  return terra[id].map || null;
}

/**
 * @param {String} id
 * @returns {Data|null}
 */
export function getDataByMapId(id) {
  if (!mapExists(id)) {
    return null;
  }

  return terra[id].map.data || null;
}

// General
// ----------

/**
 * Creates a map, allows options, featureTypes and stylesModifiers to
 * be added on creation of a map.
 * @param {String} id
 * @param {Object} options
 * @param {Object} featureTypes
 * @param {Array<Function>} stylesModifiers
 */
export function createMap(id, options = {}, featureTypes = {}, stylesModifiers = []) {
  if (terra[id]) {
    throw new Error(`Map with id of ${id}, already exists!`);
  }

  const el = document.querySelector(`#${id}`);

  if (el) {
    terra[id] = {
      map: new GoogleMaps(el, options),
      featureTypes,
      stylesModifiers,
    };
    return;
  }
}

/**
 * Destroys the map instance by setting it to null,
 * in our terra object.
 * @param {String} id
 */
export function destroyMap(id) {
  if (terra[id]) {
    terra[id] = null;
  }
}

// Public Api
export default {
  mapExists,
  getMapById,
  getDataByMapId,
  createMap,
  destroyMap,
};
