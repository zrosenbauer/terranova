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
  exports.default = undefined;

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

  var _class, _temp2;

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
  var Outer = (_temp2 = _class = function (_PureComponent) {
    _inherits(Outer, _PureComponent);

    function Outer() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Outer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Outer.__proto__ || Object.getPrototypeOf(Outer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Outer, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            height = _props.height,
            width = _props.width,
            rest = _objectWithoutProperties(_props, ['children', 'height', 'width']);

        return _react2.default.createElement(
          'div',
          {
            className: 'terra-outer',
            style: getOuterStyles(height, width)
          },
          _react2.default.createElement(_Inner2.default, rest),
          children
        );
      }
    }]);

    return Outer;
  }(_react.PureComponent), _class.displayName = 'Terra/Outer', _class.propTypes = {
    children: _react.PropTypes.node,
    height: _react.PropTypes.string.isRequired,
    width: _react.PropTypes.string.isRequired
  }, _temp2);
  exports.default = Outer;
});