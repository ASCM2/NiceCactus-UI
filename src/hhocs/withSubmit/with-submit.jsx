import React from 'react';
import PropTypes from 'prop-types';


const withSubmit = (asyncActionMethodProvider, {
  submittingName = 'submitting',
  submitName = 'submit',
  errorName = 'error',
} = {}) => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { submitting: false, error: undefined };

      this.submit = this.submit.bind(this);
    }

    async submit(data) {
      const {
        dispatch,
        onStart,
        onSuccess,
        onError
      } = this.props;

      try {
        this.setState({ submitting: true }, () => {
          if (onStart) onStart(dispatch);
        });
        const action = await asyncActionMethodProvider(data);

        dispatch(action);
        this.setState({ submitting: false }, () => {
          if (onSuccess) onSuccess(dispatch, action);
        });
      } catch (error) {
        if (error.response && [400, 500].indexOf(error.response.status) > (-1)) {
          this.setState({ error: error.response.data });
        }
        this.setState({ submitting: false }, () => {
          if (error.response) {
            if ([400, 500].indexOf(error.response.status) > (-1)) {
              if (onError) onError(dispatch, error.response.data);
            }
          }
        });
      }
    }

    render() {
      const {
        dispatch,
        onStart,
        onSuccess,
        onError,
        ...rest
      } = this.props;
      const { submitting, error } = this.state;

      return (
        <Component
          {...{
            [submittingName]: submitting,
            [submitName]: this.submit,
            [errorName]: error,
          }}
          {...rest}
        />
      );
    }
  }

  Wrapper.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onStart: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  };

  Wrapper.defaultProps = {
    onStart: undefined,
    onSuccess: undefined,
    onError: undefined,
  }

  return Wrapper;
};

export default withSubmit;
