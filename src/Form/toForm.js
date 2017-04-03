import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import getDisplayName from 'recompose/getDisplayName';

const FormWrapper = (WrappedComponent) => {
  class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        submitted: false,
      };
      this.inputs = [];
      this.submit = this.submit.bind(this);
      this.updateInputRefs = this.updateInputRefs.bind(this);
    }

    submit() {
      this.setState({
        submitted: true,
      }, () => {
        const formIsValid = this.validate();
        if (formIsValid) {
          this.props.onSubmit();
        }
      });
    }

    validate() {
      // validate all registered inputs
      const isValid = _.every(this.inputs, (inputRef) => {
        return inputRef.validate();
      });
      return isValid;
    }

    updateInputRefs(ref) {
      this.inputs = [ref, ...this.inputs];
    }
    transformChildren(children) {
      const clonedChildren = React.Children.map(children, child => {
        const name = getDisplayName(child.type);
        if (name === 'FormSubmit') {
          return React.cloneElement(child, {
            submitForm: this.submit,
          });
        }

        if (
          typeof name === 'string' &&
          name.indexOf('FormInput(') === 0
        ) {
          return React.cloneElement(child, {
            ref: this.updateInputRefs,
            formSubmitted: this.state.submitted,
          });
        }
        return React.cloneElement(child);
      });
      return clonedChildren;
    }

    render() {
      const {
        children,
        ...others,
      } = this.props;
      const transformedChildren = this.transformChildren(children);
      return (
        <WrappedComponent
          children={transformedChildren}
          {...others}
        />
      );
    }
  }

  Form.defaultProps = {
    onSubmit: () => {},
  };

  Form.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    onSubmit: PropTypes.func,
  };

  return Form;
};

export default FormWrapper;
