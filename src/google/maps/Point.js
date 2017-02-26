import { isClient } from '../../utils/general';
import maps from './index';

// google/maps/Point Module
// ------------------------------------
// Point module, handles a proxy to the
// google.maps.Point constructor, that
// will throw errors on the server.
// ------------------------------------

let Point = null;

if (isClient() && maps.Point) {
  Point = maps.Point;
} else {
  Point = function() {
    throw new Error('Cannot instantiate Point until in the client or google.maps is loaded!');
  };
}

export default Point;
