import React, { PropTypes, Component } from 'react';
import { toSubmitButton } from 'react-compose';

class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div onClick={this.props.submitForm} className={'submit-button'}>
        submit
      </div>
    );
  }
}

SubmitButton.defaultProps = {
  submitForm: () => {},
};

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  submitForm: PropTypes.func,
};

export default toSubmitButton(SubmitButton);
