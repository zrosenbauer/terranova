import React, {
  PureComponent,
  PropTypes,
} from 'react';

// Terra Imports
import Terra, {
  getMapById,
  ens,
  latLngToPixel,
  FEATURE_EVENTS,
  InfoWindow,
} from '../../../index.js';

// Internal
import data from './fakeFeatures';
import featureTypes from './featureTypes'
import infoWindows from './InfoWindows'

/**
 * @type {String}
 */
const mapId = 'example-map';

function formatAsFeature(dataPoint) {
  const { polygon, center, ...rest } = dataPoint;

  return {
    id: rest.name.toLowerCase(),
    type: polygon ? featureTypes.polygon.name : featureTypes.marker.name,
    properties: {
      ...rest,
    },
    geometry: polygon ? [polygon] : {
      lat: Number.parseFloat(center.lat),
      lng: Number.parseFloat(center.lng)
    },
  }
}

/**
 * Example Map
 * @modules Maps/Example
 */
class ExampleMap extends PureComponent {

  static displayName = 'Maps/Example';

  static propTypes = {
    features: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
  };

  static defaultProps = {
    features: data,
    options: {
      zoom: 13,
      center: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
  };

  state = {
    infowindowX: 0,
    infowindowY: 0,
    infowindowVisible: false,
    infowindowFeature: null,
  }

  constructor(props) {
    super(props);
    this.hideInfowindow = this.hideInfowindow.bind(this);
    this.showInfowindow = this.showInfowindow.bind(this);

    // Events
    this.addMarkerEvents = this.addMarkerEvents.bind(this);
    this.addPolygonEvents = this.addPolygonEvents.bind(this);

    // Area Events
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    // Add Events
    this.addMarkerEvents();
  }

  // Handlers
  // -------------

  /**
   * Handle area feature click event
   * @param {window.google.maps.Data.Feature} feature
   */
  handleClick(feature) {
    console.log(`feature id: "${feature.getId()}" click`);
    this.hideInfowindow();
    feature.getGeometry().forEachLatLng((latLng) => {
      this.showInfowindow(latLngToPixel(this.getMap(), latLng), feature);
    });
  }

  /**
   * Handle area feature mouseover event
   * @param {window.google.maps.Data.Feature} feature
   */
  handleMouseOver(feature) {
    console.log(`feature id: "${feature.getId()}" mouseover`);
  }

  /**
   * Handle area feature mouseout event
   */
  handleMouseOut(feature) {
    console.log(`feature id: "${feature.getId()}" mouseout`);
  }

  // Markers
  // -------------

  /**
   * Add the marker events and their corresponding callbacks
   * to the map.
   */
  addMarkerEvents() {
    const { click, mouseOver, mouseOut } = FEATURE_EVENTS;
    const { marker } = featureTypes;

    const onClick = ens(mapId, click, marker.name);
    const onMouseOver = ens(mapId, mouseOver, marker.name);
    const onMouseOut = ens(mapId, mouseOut, marker.name);

    this.getMap().addListener('click', this.hideInfowindow);
    this.getMap().addListener(onClick, this.handleClick);
    this.getMap().addListener(onMouseOver, this.handleMouseOver);
    this.getMap().addListener(onMouseOut, this.handleMouseOut);
  }

  // Polygons
  // ------------

  /**
   * Add the marker events and their corresponding callbacks
   * to the map.
   */
  addPolygonEvents() {
    const { click, mouseOver, mouseOut } = FEATURE_EVENTS;
    const { polygon } = featureTypes;

    const onClick = ens(mapId, click, polygon.name);
    const onMouseOver = ens(mapId, mouseOver, polygon.name);
    const onMouseOut = ens(mapId, mouseOut, polygon.name);

    this.getMap().addListener('click', this.hideInfowindow);
    this.getMap().addListener(onClick, this.handleClick);
    this.getMap().addListener(onMouseOver, this.handleMouseOver);
    this.getMap().addListener(onMouseOut, this.handleMouseOut);
  }

  /**
   * @returns {window.google.maps.Map}
   */
  getMap() {
    return getMapById(mapId);
  }

  /**
   * Shows the infowindow and passes all necessary
   * state updates
   * @param {window.google.maps.Point} pixel
   * @param {window.google.maps.Data.Feature} feature
   */
  showInfowindow(pixel, feature) {
    this.setState({
      infowindowX: pixel.x,
      infowindowY: pixel.y,
      infowindowVisible: true,
      infowindowFeature: feature,
    });
  }

  /**
   * Hides the infowindow
   */
  hideInfowindow() {
    this.setState({
      infowindowVisible: false,
    });
  }

  render() {
    const {
      features,
      options,
    } = this.props;
    const {
      infowindowVisible,
      infowindowFeature,
      infowindowX,
      infowindowY,
    } = this.state;

    return (
      <div className="example-map-component">
        <Terra
          id={mapId}
          height="100vh"
          width="100vw"
          options={options}
          features={features.map(item => formatAsFeature(item))}
          featureTypes={featureTypes}
        >
          <InfoWindow
            show={infowindowVisible}
            x={infowindowX}
            y={infowindowY}
            feature={infowindowFeature}
            variations={infoWindows}
          />
        </Terra>
      </div>
    );
  }
}

export default ExampleMap;
