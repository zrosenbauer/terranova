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
      return {};
    },
    InfoWindow() {
      return {};
    },
    Marker() {
      return {};
    },
    MarkerImage() {
      return {};
    },
    Map() {
      return {};
    },
    Point() {
      return {};
    },
    Size() {
      return {};
    },
    Data() {
      return {};
    }
  }
};
