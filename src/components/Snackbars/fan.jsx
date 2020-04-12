import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';


const Fan = (props) => {
  const { open, shortname, onClose } = props;

  return (
    <Snackbar
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      message={`Vous aimez "${shortname}"`}
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      onClose={onClose}
    />
  );
}

Fan.propTypes = {
  open: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

Fan.defaultProps = {
  open: false,
};

export default Fan;
