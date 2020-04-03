import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';


const MoreBusinessesError = (props) => {
  const { open: initOpen } = props;
  const [open, setOpen] = useState(initOpen);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      onClose={() => setOpen(false)}
      message="Une erreur est survenue lors de la récupération de nouveaux établissements."
    />
  );
}

MoreBusinessesError.propTypes = {
  open: PropTypes.bool,
};

MoreBusinessesError.defaultProps = {
  open: false,
};

export default MoreBusinessesError;
