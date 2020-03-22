import React from 'react';
import PropTypes from 'prop-types';

import {
  DefaultLoading,
  DefaultValidationError,
  DefaultInternalError,
} from '../../components/utils';


const withFetch = asyncAction => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loaded: false, error: undefined };
    }

    async componentDidMount() {
      try {
        const { dispatch, onSuccess } = this.props;
        const action = await asyncAction;

        dispatch(action);
        this.setState({ loaded: true }, () => {
          if (onSuccess) onSuccess(dispatch);
        });
      } catch (error) {
        const { dispatch, onError } = this.props;

        this.setState({ error }, () => {
          if (error.response) {
            if (error.response.status && [400, 500].indexOf(error.response.status) > (-1)) {
              if (onError) onError(dispatch, error.response.data);
            }
          }
        });
      }
    }

    render() {
      const {
        dispatch,
        loading,
        validationError,
        internalError,
        onSuccess,
        onError,
        ...rest
      } = this.props;
      const { error, loaded } = this.state;

      if (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) return validationError(data);
          if (status === 500) return internalError(data);
        }
      }
      return loaded ? <Component {...rest} /> : loading;
    }
  }

  Wrapper.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.node,
    validationError: PropTypes.func,
    internalError: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  };

  Wrapper.defaultProps = {
    loading: <DefaultLoading />,
    validationError: err => <DefaultValidationError error={err} />,
    internalError: err => <DefaultInternalError error={err} />,
    onSuccess: undefined,
    onError: undefined,
  };

  return Wrapper;
};

export default withFetch;
