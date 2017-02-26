import React, {
  PureComponent,
  PropTypes,
} from 'react';
import isEmpty from 'lodash/isEmpty';

// Terra Imports
import {
  getFeatureType,
  getFeatureProperties,
} from './utils/features';

/**
 * Gets the Infowindow based on the options
 * and the current feature.type
 * @param {Object} variations
 * @param {Object} feature
 * @returns {React.Component}
 * @private
 */
function getInfoWindowByFeature(variations, feature) {
  if (!feature) {
    return null;
  }

  return variations[getFeatureType(feature)];
}

/**
 * Infowindow for our maps
 * @modules components/Areas/Maps/InfoWindow
 */
export default class InfoWindow extends PureComponent {

  static displayName = 'components/Terra/InfoWindow';

  static defaultProps = {
    show: false,
  };

  static propTypes = {
    show: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    feature: PropTypes.object,
    variations: PropTypes.object,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    if (props.variations) {
      this.variations = {
        ...this.variations,
        ...props.variations,
      };
    }

    if (props.style) {
      this.style = {
        ...this.style,
        ...props.style,
      };
    }
  }

  variations = {};

  style = {
    zIndex: '1000',
    position: 'absolute',
    whiteSpace: 'nowrap',
  };

  render() {
    if (isEmpty(this.variations)) {
      return null;
    }

    const {
      feature,
      show,
      x,
      y,
    } = this.props;

    const InfoWindowComponent = getInfoWindowByFeature(this.variations, feature);

    return (
      <div
        style={{
          display: show ? 'block' : 'none',
          left: x,
          top: y,
          ...this.style,
        }}
        className="terra-infowindow"
      >
        {feature && (
          <InfoWindowComponent {...getFeatureProperties(feature)} />
        )}
      </div>
    );
  }
}
