import './style.scss';

import React, { PropTypes, Component } from 'react';
import Form from './Form';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    const {
      text,
    } = this.state;
    return (
      <Form onSubmit={() => console.log('onsubmit')}>
        <span>Error text will show on: </span>
        <span>blurr, </span>
        <span>submit</span>
        <TextInput
          onValueChange={(v) => {
            this.setState({ text: v });
          }}
          value={text}
          validator={[
            (value, fieldName) => {
              const result = {
                valid: !!value,
                message: `${fieldName} is required`,
              };
              return result;
            },
          ]}
        />
        <SubmitButton />
      </Form>
    );
  }
}

FormView.defaultProps = {
};

FormView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormView;
