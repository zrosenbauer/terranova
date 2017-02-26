(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './Inner'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./Inner'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Inner);
    global.Outer = mod.exports;
  }
})(this, function (exports, _react, _Inner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Inner2 = _interopRequireDefault(_Inner);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  /**
   * @param {String} height
   * @param {String} width
   * @returns {Object}
   */
  function getOuterStyles(height, width) {
    return {
      position: 'relative',
      height: height,
      width: width
    };
  }

  /**
   * MapsWrapper
   * @modules Terra/Outer
   */
  var Outer = function Outer(_ref) {
    var children = _ref.children,
        height = _ref.height,
        width = _ref.width,
        rest = _objectWithoutProperties(_ref, ['children', 'height', 'width']);

    return _react2.default.createElement(
      'div',
      {
        className: 'terra-outer',
        style: getOuterStyles(height, width)
      },
      _react2.default.createElement(_Inner2.default, rest),
      children
    );
  };

  Outer.displayName = 'Terra/Outer';

  Outer.propTypes = {
    children: _react.PropTypes.node,
    height: _react.PropTypes.string.isRequired,
    width: _react.PropTypes.string.isRequired
  };

  exports.default = Outer;
});