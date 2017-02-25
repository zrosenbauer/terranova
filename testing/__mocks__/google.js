export default {
  maps: {
    event: {
      trigger() {},
    },
    LatLng(lat, lng) {
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        lat() { return this.latitude; },
        lng() { return this.longitude; }
      };
    },
    LatLngBounds(ne, sw) {
      return {
        getSouthWest() { return sw; },
        getNorthEast() { return ne; }
      };
    },
    OverlayView() {
      return {
        typeChecker: 'OverlayView',
      };
    },
    InfoWindow() {
      return {
        typeChecker: 'InfoWindow',
      };
    },
    Marker() {
      return {
        typeChecker: 'Marker',
      };
    },
    MarkerImage() {
      return {
        typeChecker: 'MarkerImage',
      };
    },
    Map(options) {
      return {
        options,
        data: {},
        map: {},
        typeChecker: 'Map',
      };
    },
    Point() {
      return {
        typeChecker: 'Map',
      };
    },
    Size() {
      return {
        typeChecker: 'Map',
      };
    },
    Data() {
      return {
        typeChecker: 'Map',
      };
    }
  }
};
