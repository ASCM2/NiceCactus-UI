import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';


const ConfirmUnsubscription = (props) => {
  const {
    open, shortname, onUnsubscribe, onCancel,
  } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Se désabonner de "${shortname}" ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          NON
        </Button>
        <Button onClick={onUnsubscribe} color="primary" autoFocus>
          OUI
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmUnsubscription.propTypes = {
  open: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmUnsubscription.defaultProps = {
  open: false,
};

export default ConfirmUnsubscription;
