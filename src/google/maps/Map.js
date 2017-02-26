import { isClient } from '../../utils/general';
import maps from './index';

// google/maps/Map Module
// ------------------------------------
// Map module, handles a proxy to the
// google.maps.Map constructor, that
// will throw errors on the server.
// ------------------------------------

let Map = null;

if (isClient() && maps.Map) {
  Map = maps.Map;
} else {
  Map = function() {
    console.log('her', isClient())
    throw new Error('Cannot instantiate Map until in the client or google.maps is loaded!');
  };
}

export default Map;
