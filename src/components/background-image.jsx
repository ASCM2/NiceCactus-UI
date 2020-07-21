/* global Image: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import WithImage from './with-image';


const useStyles = makeStyles({
  root: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ src }) => `url(${src})`,
  },
});

const BackgroundImage = (props) => {
  const {
    alt, src,
    loading: Loading, error: Err,
    onError,
    ...rest
  } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const classes = useStyles({ src, ...rest });
  const ersatz = new Image();

  ersatz.src = src;
  ersatz.onload = () => { setLoading(false); };
  ersatz.onerror = () => { setError(true); onError(); };

  return (
    <WithImage
      classes={{ root: classes.root }}
      mediaLoading={loading}
      mediaError={error}
      component={<div className={classes.root} />}
      error={Err}
      loading={Loading}
    />
  );
};

BackgroundImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  loading: PropTypes.node.isRequired,
  error: PropTypes.node,
  onError: PropTypes.func,
};

BackgroundImage.defaultProps = {
  src: null,
  error: null,
  onError: () => {},
};

export default BackgroundImage;
