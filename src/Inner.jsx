import React, { Component, PropTypes } from 'react';

import {
  createMap,
  destroyMap,
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
    options: PropTypes.object,
    features: PropTypes.array,
    featureTypes: PropTypes.object,
    setStyles: PropTypes.array,
  };

  static defaultProps = {
    options: null,
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
    createMap(id, options, featureTypes, setStyles);

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
    destroyMap(this.props.id);
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
