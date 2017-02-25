import React, {
  PureComponent,
  PropTypes,
} from 'react';

import Inner from './Inner';

/**
 * @param {String} height
 * @param {String} width
 * @returns {Object}
 */
function getOuterStyles(height, width) {
  return {
    position: 'relative',
    height,
    width,
  };
}

/**
 * MapsWrapper
 * @modules Terra/Outer
 */
export default class Outer extends PureComponent {

  static displayName = 'Terra/Outer';

  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  };

  state = {};

  render() {
    const {
      children,
      height,
      width,
      ...rest
    } = this.props;

    return (
      <div
        className="terra-outer"
        style={getOuterStyles(height, width)}
      >
        <Inner {...rest} />
        {children}
      </div>
    );
  }
}
