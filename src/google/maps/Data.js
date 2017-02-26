import { isClient } from '../../utils/general';
import maps from './index';

// google/maps/Data Module
// ------------------------------------
// Data module, handles a proxy to the
// google.maps.Data constructor, that
// will throw errors on the server.
// ------------------------------------

let Data = null;

if (isClient() && maps.Data) {
  Data = maps.Data;
} else {
  Data = function() {
    throw new Error('Cannot instantiate Data until in the client or google.maps is loaded!');
  };
}

export default Data;
