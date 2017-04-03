'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _getDisplayName = require('recompose/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormWrapper = function FormWrapper(WrappedComponent) {
  var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

      _this.state = {
        submitted: false
      };
      _this.inputs = [];
      _this.submit = _this.submit.bind(_this);
      _this.updateInputRefs = _this.updateInputRefs.bind(_this);
      return _this;
    }

    _createClass(Form, [{
      key: 'submit',
      value: function submit() {
        var _this2 = this;

        this.setState({
          submitted: true
        }, function () {
          var formIsValid = _this2.validate();
          if (formIsValid) {
            _this2.props.onSubmit();
          }
        });
      }
    }, {
      key: 'validate',
      value: function validate() {
        // validate all registered inputs
        var isValid = _lodash2.default.every(this.inputs, function (inputRef) {
          return inputRef.validate();
        });
        return isValid;
      }
    }, {
      key: 'updateInputRefs',
      value: function updateInputRefs(ref) {
        this.inputs = [ref].concat(_toConsumableArray(this.inputs));
      }
    }, {
      key: 'transformChildren',
      value: function transformChildren(children) {
        var _this3 = this;

        var clonedChildren = _react2.default.Children.map(children, function (child) {
          var name = (0, _getDisplayName2.default)(child.type);
          if (name === 'FormSubmit') {
            return _react2.default.cloneElement(child, {
              submitForm: _this3.submit
            });
          }

          if (typeof name === 'string' && name.indexOf('FormInput(') === 0) {
            return _react2.default.cloneElement(child, {
              ref: _this3.updateInputRefs,
              formSubmitted: _this3.state.submitted
            });
          }
          return _react2.default.cloneElement(child);
        });
        return clonedChildren;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            others = _objectWithoutProperties(_props, ['children']);

        var transformedChildren = this.transformChildren(children);
        return _react2.default.createElement(WrappedComponent, _extends({
          children: transformedChildren
        }, others));
      }
    }]);

    return Form;
  }(_react.Component);

  Form.defaultProps = {
    onSubmit: function onSubmit() {}
  };

  Form.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
    onSubmit: _react.PropTypes.func
  };

  return Form;
};

exports.default = FormWrapper;