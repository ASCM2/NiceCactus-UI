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

const InternalServerError = (props) => {
  const classes = useStyles(props);

  const { error } = props;
  const { message = undefined } = error;
  const text = message ? `Une erreur interne s'est produite sur le serveur : ${message}.` : "Une erreur interne s'est produite sur le serveur.";

  return (
    <div className={classes.root}>
      <Typography variant="body2" component="span">
        {text}
      </Typography>
    </div>
  )
};

InternalServerError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

InternalServerError.defaultProps = {
  error: {},
};

export default InternalServerError;
