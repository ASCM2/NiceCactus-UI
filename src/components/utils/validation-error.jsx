import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    minHeight: 200,
  },
});

const ValidationError = (props) => {
  const classes = useStyles(props);

  const { error } = props;
  const { message = undefined } = error;
  const text = message ? `Une erreur de validation s'est produite: ${message}.` : "Une erreur de validation s'est produite.";

  return (
    <div className={classes.root}>
      <Typography variant="body2" component="span">
        {text}
      </Typography>
    </div>
  )
};

ValidationError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

ValidationError.defaultProps = {
  error: {},
};

export default ValidationError;
