import './style.scss';

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div>
        <Link to={'/form'}>Form</Link>
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
