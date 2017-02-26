import { isClient } from '../../utils/general';
import maps from './index';

// google/maps/LatLng Module
// ------------------------------------
// LatLng module, handles a proxy to the
// google.maps.LatLng constructor, that
// will throw errors on the server.
// ------------------------------------

let LatLng = null;

if (isClient() && maps.LatLng) {
  LatLng = maps.LatLng;
} else {
  LatLng = function() {
    throw new Error('Cannot instantiate LatLng until in the client or google.maps is loaded!');
  };
}

export default LatLng;
