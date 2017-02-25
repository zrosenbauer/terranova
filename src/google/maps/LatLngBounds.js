import { isClient } from '../../utils/general';
import maps from './index';

// google/maps/LatLngBounds Module
// ------------------------------------
// LatLngBounds module, handles a proxy to
// the google.maps.LatLngBounds constructor,
// that will throw an error on the server.
// ------------------------------------

let LatLng = null;

if (isClient() && maps.LatLngBounds) {
  LatLng = maps.LatLngBounds;
} else {
  LatLng = function() {
    throw new Error('Cannot instantiate LatLngBounds until in the client or google.maps is loaded!');
  };
}

export default LatLng;
