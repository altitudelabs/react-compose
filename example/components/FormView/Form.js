import React, { PropTypes, Component } from 'react';
import { toForm } from 'react-compose';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div className={'form-view'}>
        {this.props.children}
      </div>
    );
  }
}

Form.defaultProps = {
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default toForm(Form);
