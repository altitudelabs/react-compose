import React, { Component, PropTypes } from 'react';
import getDisplayName from 'recompose/getDisplayName';
import setDisplayName from 'recompose/setDisplayName';

const ElementWrapper = WrappedComponent => {
  class FormElementBase extends Component {
    constructor(props) {
      super(props);

      this.shouldShowError = this.shouldShowError.bind(this);
      this.refWrappedElement = this.refWrappedElement.bind(this);
    }

    getErrorText() {
      const {
        validator,
        value,
      } = this.props;
      const validatorArray = _.isArray(validator) ? validator : [validator];

      const firstValidatorToFail = _.find(validatorArray, validate => {
        return !validate(value, getDisplayName(WrappedComponent)).valid;
      });
      const errorText = firstValidatorToFail == null
        ? ''
        : firstValidatorToFail(value, getDisplayName(WrappedComponent)).message;
      return errorText;
    }

    shouldShowError() {
      const {
        formSubmitted,
      } = this.props;

      // by default, show error when form is submitted
      const defaultShouldShow = formSubmitted;

      const wrappedInstanceShouldShow = _.get(
        this,
        ['wrappedInstance', 'shouldShowError'],
        _.stubFalse
      );

      const shouldShow = defaultShouldShow || wrappedInstanceShouldShow();

      /**
       * NOTE
       * this means wrapped component's shouldshowError can override
       * default behaviour to show error message, but not to hide it.
       *
       * i.e. shouldShow is always true if formSubmitted = true
       */
      return shouldShow;
    }

    validate() {
      const {
        validator,
        value,
      } = this.props;
      const validatorArray = _.isArray(validator) ? validator : [validator];
      return _.every(validatorArray, validate => {
        const validationResult = validate(value, getDisplayName(WrappedComponent));
        return validationResult.valid;
      });
    }

    refWrappedElement(wrapped) {
      const {
        ref, // eslint-disable-line no-unused-vars
      } = this.props;

      ref(wrapped);
      this.wrappedInstance = wrapped;
    }

    render() {
      const {
        formSubmitted, // eslint-disable-line no-unused-vars
        validator, // eslint-disable-line no-unused-vars
        ...others,
      } = this.props;
      const errorText = this.getErrorText();
      return (
        <WrappedComponent
          {...others}
          ref={this.refWrappedElement}
          shouldShowError={this.shouldShowError}
          errorText={errorText}
        />
      );
    }
  }

  FormElementBase.defaultProps = {
    shouldShowError: () => false,
    formSubmitted: false, // Form-passed prop
    validator: () => { return { valid: true, message: 'default message' }; },
    ref: () => {},
  };

  FormElementBase.propTypes = {
    shouldShowError: PropTypes.func,
    formSubmitted: PropTypes.bool,
    validator: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      ),
      PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    ]),
    ref: PropTypes.func,
    value: PropTypes.any, // depends on the form input
  };


  return setDisplayName(`FormInput(${getDisplayName(WrappedComponent)})`)(FormElementBase);
};

export default ElementWrapper;
