import React, { PropTypes, Component } from 'react';
import { toFormElement } from 'react-compose';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      blurred: false,
    };
    this.shouldShowError = this.shouldShowError.bind(this);
  }

  shouldShowError() {
    const {
      blurred,
    } = this.state;
    return blurred;
  }

  render() {
    const {
      shouldShowError,
      errorText,
      onValueChange,
      ...others,
    } = this.props;

    const {
      blurred,
    } = this.state;

    return (
      <div className={'text-input'}>
        <span>TextField</span>
        <input
          {...others}
          onBlur={() => {
            if (blurred) { return; }
            this.setState({
              blurred: true,
            });
          }}
          onChange={(e) => onValueChange(e.target.value)}
        />
        {shouldShowError() ?
          <span className={'error-text'}>{errorText}</span>
        : null}
      </div>
    );
  }
}

TextInput.defaultProps = {
};

TextInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  shouldShowError: PropTypes.func,
  errorText: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default toFormElement(TextInput);
