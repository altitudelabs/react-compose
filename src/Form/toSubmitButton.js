import React from 'react';
import setDisplayName from 'recompose/setDisplayName';

const ElementWrapper = WrappedComponent => {
  const FormSubmit = (props) => {
    return (
      <WrappedComponent
        {...props}
      />
    );
  };

  FormSubmit.defaultProps = {
  };

  FormSubmit.propTypes = {
  };


  return setDisplayName('FormSubmit')(FormSubmit);
};

export default ElementWrapper;
