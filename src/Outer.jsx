import React, { PropTypes } from 'react';

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
const Outer = ({
  children,
  height,
  width,
  ...rest
}) => (
  <div
    className="terra-outer"
    style={getOuterStyles(height, width)}
  >
    <Inner {...rest} />
    {children}
  </div>
);

Outer.displayName = 'Terra/Outer';

Outer.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Outer;
