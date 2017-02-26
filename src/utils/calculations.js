/* @flow */

import Point from '../google/maps/Point';

// Calculations Module
// ------------------------------------
// Apologize for the poor naming or the
// accurate naming, but naming is a
// bit difficult at times. Calc's
// modules handles and calcs!
// ------------------------------------

/**
 * Calculates the point based on the map
 * scale and bounds
 * @param {window.google.maps.Point} point
 * @param {Object} bounds
 * @param {Number} scale
 * @returns {[Number,Number]}
 * @private
 */
function calculatePointWithScale(point: Point, bounds: Object, scale: number): Array<number> {
  return [(point.x - bounds.bl.x) * scale, (point.y - bounds.tr.y) * scale];
}

/**
 * Converts a LatLng to a pixel (maps.Point) using the
 * map projection as its basis
 * @param {window.google.maps.Map} map
 * @param {window.google.maps.LatLng} latLng
 * @returns {window.google.maps.Point}
 */
export function latLngToPixel(map: Object, latLng: Object): Point {
  const projection = map.getProjection();
  const bounds = map.getBounds();
  const scale = Math.pow(2, map.getZoom());
  const mapBounds = {
    tr: projection.fromLatLngToPoint(bounds.getNorthEast()),
    bl: projection.fromLatLngToPoint(bounds.getSouthWest()),
  };
  const point = projection.fromLatLngToPoint(latLng);

  return new Point(...calculatePointWithScale(point, mapBounds, scale));
}

// Public Api
export default {
  latLngToPixel,
};
