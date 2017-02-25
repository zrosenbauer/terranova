(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../google/maps/Map', '../google/maps/Data'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../google/maps/Map'), require('../google/maps/Data'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Map, global.Data);
    global.terra = mod.exports;
  }
})(this, function (exports, _Map, _Data) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mapExists = mapExists;
  exports.getTerraById = getTerraById;
  exports.getMapById = getMapById;
  exports.getDataByMapId = getDataByMapId;
  exports.createMap = createMap;
  exports.destroyMap = destroyMap;

  var _Map2 = _interopRequireDefault(_Map);

  var _Data2 = _interopRequireDefault(_Data);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ''; /*
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
  var terra = {};

  // Methods
  // -----------------

  /**
   * Check if the map exists
   * @param {String} id
   * @returns {Boolean}
   */
  function mapExists(id) {
    return Boolean(terra[id]);
  }

  // Getters
  // ----------

  /**
   * @param {String} id
   * @returns {Maps|null}
   */
  function getTerraById(id) {
    if (!mapExists(id)) {
      return null;
    }

    return terra[id] || null;
  }

  /**
   * @param {String} id
   * @returns {Maps|null}
   */
  function getMapById(id) {
    if (!mapExists(id)) {
      return null;
    }

    return terra[id].map || null;
  }

  /**
   * @param {String} id
   * @returns {Data|null}
   */
  function getDataByMapId(id) {
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
  function createMap(id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var featureTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var stylesModifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    if (terra[id]) {
      throw new Error('Map with id of ' + id + ', already exists!');
    }

    var el = document.querySelector('#' + id);

    if (el) {
      terra[id] = {
        map: new _Map2.default(el, options),
        featureTypes: featureTypes,
        stylesModifiers: stylesModifiers
      };
      return;
    }
  }

  /**
   * Destroys the map instance by setting it to null,
   * in our terra object.
   * @param {String} id
   */
  function destroyMap(id) {
    if (terra[id]) {
      terra[id] = null;
    }
  }

  // Public Api
  exports.default = {
    mapExists: mapExists,
    getMapById: getMapById,
    getDataByMapId: getDataByMapId,
    createMap: createMap,
    destroyMap: destroyMap
  };
});