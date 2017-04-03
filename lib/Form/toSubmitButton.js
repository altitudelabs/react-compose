'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _setDisplayName = require('recompose/setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ElementWrapper = function ElementWrapper(WrappedComponent) {
  var FormSubmit = function FormSubmit(props) {
    return _react2.default.createElement(WrappedComponent, props);
  };

  FormSubmit.defaultProps = {};

  FormSubmit.propTypes = {};

  return (0, _setDisplayName2.default)('FormSubmit')(FormSubmit);
};

exports.default = ElementWrapper;