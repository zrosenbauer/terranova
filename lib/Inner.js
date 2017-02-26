(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './utils/terra', './utils/features'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./utils/terra'), require('./utils/features'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.terra, global.features);
    global.Inner = mod.exports;
  }
})(this, function (exports, _react, _terra, _features) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var _class, _temp;

  /**
   * @type {Object<String>}
   */
  var innerStyles = {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0'
  };

  /**
   * Inner
   * @modules Terra/Inner
   */
  var Inner = (_temp = _class = function (_Component) {
    _inherits(Inner, _Component);

    function Inner() {
      _classCallCheck(this, Inner);

      return _possibleConstructorReturn(this, (Inner.__proto__ || Object.getPrototypeOf(Inner)).apply(this, arguments));
    }

    _createClass(Inner, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            id = _props.id,
            options = _props.options,
            features = _props.features,
            featureTypes = _props.featureTypes,
            setStyles = _props.setStyles;


        // creates the map
        (0, _terra.createTerra)(id, options, featureTypes, setStyles);

        // add all feature to the map.data, update styles etc.
        (0, _features.addFeatures)(id, features);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // update features as needed
        (0, _features.updateFeatures)(this.props.id, nextProps.features);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        (0, _terra.destroyTerra)(this.props.id);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement('div', {
          id: this.props.id,
          style: innerStyles
        });
      }
    }]);

    return Inner;
  }(_react.Component), _class.displayName = 'Terra/Inner', _class.propTypes = {
    id: _react.PropTypes.string.isRequired,
    options: _react.PropTypes.shape({
      center: _react.PropTypes.shape({
        lat: _react.PropTypes.number.isRequired,
        lng: _react.PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
    features: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      id: _react.PropTypes.string.isRequired,
      type: _react.PropTypes.string.isRequired,
      properties: _react.PropTypes.object,
      geometry: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.shape({
        lat: _react.PropTypes.number.isRequired,
        lng: _react.PropTypes.number.isRequired
      })]).isRequired
    })),
    featureTypes: _react.PropTypes.shape({
      name: _react.PropTypes.string,
      initialState: _react.PropTypes.object,
      handleEvents: _react.PropTypes.func,
      getStyles: _react.PropTypes.func
    }),
    setStyles: _react.PropTypes.array
  }, _class.defaultProps = {
    // Default option, places us in chicago
    // cause without this the map will error out
    // without any kind of sane error messaging
    options: {
      zoom: 13,
      center: {
        lat: 41.8781,
        lng: -87.6298
      }
    }
  }, _temp);
  exports.default = Inner;
});