(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'lodash/isEmpty', './utils/features'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('lodash/isEmpty'), require('./utils/features'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.isEmpty, global.features);
    global.InfoWindow = mod.exports;
  }
})(this, function (exports, _react, _isEmpty, _features) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _isEmpty2 = _interopRequireDefault(_isEmpty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _class, _temp;

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

    return variations[(0, _features.getFeatureType)(feature)];
  }

  /**
   * Infowindow for our maps
   * @modules components/Areas/Maps/InfoWindow
   */
  var InfoWindow = (_temp = _class = function (_PureComponent) {
    _inherits(InfoWindow, _PureComponent);

    function InfoWindow(props) {
      _classCallCheck(this, InfoWindow);

      var _this = _possibleConstructorReturn(this, (InfoWindow.__proto__ || Object.getPrototypeOf(InfoWindow)).call(this, props));

      _this.variations = {};
      _this.style = {
        zIndex: '1000',
        position: 'absolute',
        whiteSpace: 'nowrap'
      };


      if (props.variations) {
        _this.variations = _extends({}, _this.variations, props.variations);
      }

      if (props.style) {
        _this.style = _extends({}, _this.style, props.style);
      }
      return _this;
    }

    _createClass(InfoWindow, [{
      key: 'render',
      value: function render() {
        if ((0, _isEmpty2.default)(this.variations)) {
          return null;
        }

        var _props = this.props,
            feature = _props.feature,
            show = _props.show,
            x = _props.x,
            y = _props.y;


        var InfoWindowComponent = getInfoWindowByFeature(this.variations, feature);

        return _react2.default.createElement(
          'div',
          {
            style: _extends({
              display: show ? 'block' : 'none',
              left: x,
              top: y
            }, this.style),
            className: 'terra-infowindow'
          },
          feature && _react2.default.createElement(InfoWindowComponent, (0, _features.getFeatureProperties)(feature))
        );
      }
    }]);

    return InfoWindow;
  }(_react.PureComponent), _class.displayName = 'components/Terra/InfoWindow', _class.defaultProps = {
    show: false
  }, _class.propTypes = {
    show: _react.PropTypes.bool,
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    feature: _react.PropTypes.object,
    variations: _react.PropTypes.object,
    style: _react.PropTypes.object
  }, _temp);
  exports.default = InfoWindow;
});