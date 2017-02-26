export const setStyle = jest.fn();

const google = {
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
      let features = [];
      return {
        options,
        data: {
          getFeatures: () => features,
          clear: () => {
            features = [];
          },
          add: (feature) => {
            features.push(feature);
          },
          setStyle: (cb) => {
            features.forEach((item) => {
              const val = cb(item);
              setStyle(val);
            });
          },
          getFeatureById: (val) => val,
        },
        map: {},
        typeChecker: 'Map',
        getBounds() {
          return {
            getNorthEast() {
              return {
                lat: 44.324,
                lng: 88.4224
              }
            },
            getSouthWest() {
              return {
                lat: 49.324,
                lng: 90.4224
              }
            }
          };
        },
        getProjection() {
          return {
            fromLatLngToPoint(val) {
              return {
                x: 10 * val.lat,
                y: 10 * val.lng,
              };
            }
          }
        },
        getZoom() {
          return 10;
        },
      };
    },
    Point: class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
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

// Add Feature
google.maps.Data.Feature = (val) => val;

// LatLngBounds
class LatLngBounds extends Array {
  ne = 0;
  sw = 0;
  constructor(ne, sw) {
    super();
    this.ne = ne || this.ne;
    this.sw = sw || this.sw;
    return this;
  }
  getNorthEast = () => this.ne;
  getSouthWest = () => this.sw;
  extend = (val) => {
    this.push(val);
  };
}

google.maps.LatLngBounds = LatLngBounds;
export default google;
