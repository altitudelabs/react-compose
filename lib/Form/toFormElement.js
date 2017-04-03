'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getDisplayName = require('recompose/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _setDisplayName = require('recompose/setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementWrapper = function ElementWrapper(WrappedComponent) {
  var FormElementBase = function (_Component) {
    _inherits(FormElementBase, _Component);

    function FormElementBase(props) {
      _classCallCheck(this, FormElementBase);

      var _this = _possibleConstructorReturn(this, (FormElementBase.__proto__ || Object.getPrototypeOf(FormElementBase)).call(this, props));

      _this.shouldShowError = _this.shouldShowError.bind(_this);
      _this.refWrappedElement = _this.refWrappedElement.bind(_this);
      return _this;
    }

    _createClass(FormElementBase, [{
      key: 'getErrorText',
      value: function getErrorText() {
        var _props = this.props,
            validator = _props.validator,
            value = _props.value;

        var validatorArray = _.isArray(validator) ? validator : [validator];

        var firstValidatorToFail = _.find(validatorArray, function (validate) {
          return !validate(value, (0, _getDisplayName2.default)(WrappedComponent)).valid;
        });
        var errorText = firstValidatorToFail == null ? '' : firstValidatorToFail(value, (0, _getDisplayName2.default)(WrappedComponent)).message;
        return errorText;
      }
    }, {
      key: 'shouldShowError',
      value: function shouldShowError() {
        var formSubmitted = this.props.formSubmitted;

        // by default, show error when form is submitted

        var defaultShouldShow = formSubmitted;

        var wrappedInstanceShouldShow = _.get(this, ['wrappedInstance', 'shouldShowError'], _.stubFalse);

        var shouldShow = defaultShouldShow || wrappedInstanceShouldShow();

        /**
         * NOTE
         * this means wrapped component's shouldshowError can override
         * default behaviour to show error message, but not to hide it.
         *
         * i.e. shouldShow is always true if formSubmitted = true
         */
        return shouldShow;
      }
    }, {
      key: 'validate',
      value: function validate() {
        var _props2 = this.props,
            validator = _props2.validator,
            value = _props2.value;

        var validatorArray = _.isArray(validator) ? validator : [validator];
        return _.every(validatorArray, function (validate) {
          var validationResult = validate(value, (0, _getDisplayName2.default)(WrappedComponent));
          return validationResult.valid;
        });
      }
    }, {
      key: 'refWrappedElement',
      value: function refWrappedElement(wrapped) {
        var ref = this.props.ref;


        ref(wrapped);
        this.wrappedInstance = wrapped;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            formSubmitted = _props3.formSubmitted,
            validator = _props3.validator,
            others = _objectWithoutProperties(_props3, ['formSubmitted', 'validator']);

        var errorText = this.getErrorText();
        return _react2.default.createElement(WrappedComponent, _extends({}, others, {
          ref: this.refWrappedElement,
          shouldShowError: this.shouldShowError,
          errorText: errorText
        }));
      }
    }]);

    return FormElementBase;
  }(_react.Component);

  FormElementBase.defaultProps = {
    shouldShowError: function shouldShowError() {
      return false;
    },
    formSubmitted: false, // Form-passed prop
    validator: function validator() {
      return { valid: true, message: 'default message' };
    },
    ref: function ref() {}
  };

  FormElementBase.propTypes = {
    shouldShowError: _react.PropTypes.func,
    formSubmitted: _react.PropTypes.bool,
    validator: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func])), _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func])]),
    ref: _react.PropTypes.func,
    value: _react.PropTypes.any };

  return (0, _setDisplayName2.default)('FormInput(' + (0, _getDisplayName2.default)(WrappedComponent) + ')')(FormElementBase);
};

exports.default = ElementWrapper;