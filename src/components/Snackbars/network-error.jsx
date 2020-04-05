import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';


const NetworkError = (props) => {
  const { open, onClose } = props;

  return (
    <Snackbar
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      message="Une erreur s'est produite sur le réseau"
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      onClose={onClose}
    />
  );
}

NetworkError.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

NetworkError.defaultProps = {
  open: false,
};

export default NetworkError;
