import React, { Component, PropTypes } from 'react';

import {
  createTerra,
  destroyTerra,
} from './utils/terra';
import {
  addFeatures,
  updateFeatures,
} from './utils/features';

/**
 * @type {Object<String>}
 */
const innerStyles = {
  position: 'absolute',
  top: '0',
  right: '0',
  left: '0',
  bottom: '0',
};

/**
 * Inner
 * @modules Terra/Inner
 */
export default class Inner extends Component {

  static displayName = 'Terra/Inner';

  static propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      center: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired
    }).isRequired,
    features: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      properties: PropTypes.object,
      geometry: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.shape({
          lat: PropTypes.number.isRequired,
          lng: PropTypes.number.isRequired,
        }),
      ]).isRequired,
    })),
    featureTypes: PropTypes.shape({
      name: PropTypes.string,
      initialState: PropTypes.object,
      handleEvents: PropTypes.func,
      getStyles: PropTypes.func,
    }),
    setStyles: PropTypes.array,
  };

  static defaultProps = {
    // Default option, places us in chicago
    // cause without this the map will error out
    // without any kind of sane error messaging
    options: {
      zoom: 13,
      center: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
  };

  componentDidMount() {
    const {
      id,
      options,
      features,
      featureTypes,
      setStyles,
    } = this.props;

    // creates the map
    createTerra(id, options, featureTypes, setStyles);

    // add all feature to the map.data, update styles etc.
    addFeatures(id, features);
  }

  componentWillReceiveProps(nextProps) {
    // update features as needed
    updateFeatures(this.props.id, nextProps.features);
  }

  /**
   * We should never rerender this component, only update it
   * via the google maps api either internally here OR using the
   * google.maps api.
   * @returns {Boolean}
   */
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    destroyTerra(this.props.id);
  }

  render() {
    return (
      <div
        id={this.props.id}
        style={innerStyles}
      />
    );
  }
}
