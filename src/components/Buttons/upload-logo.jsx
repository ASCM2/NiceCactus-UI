import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddAPhoto';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    position: 'relative',
    top: 2,
    marginLeft: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const UploadLogo = (props) => {
  const {
    image, uploading, onUploadStart,
    onFileUploaded, ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const label = image ? 'Modifier votre logo' : 'Ajouter un logo';

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-button-file-input"
        name="image"
        type="file"
        onChange={onFileUploaded}
      />
      {uploading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={classes.root}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
      <label htmlFor="upload-button-file-input">
        <Button
          style={{ color: '#fff', display: uploading ? 'none' : undefined }}
          classes={{ root: classes.root }}
          variant="contained"
          color="secondary"
          component="span"
          onClick={onUploadStart}
        >
          <AddIcon />
          <Typography classes={{ root: classes.label }} variant="inherit">
            {label}
          </Typography>
        </Button>
      </label>
    </>
  );
};

UploadLogo.propTypes = {
  image: PropTypes.bool,
  uploading: PropTypes.bool,
  onUploadStart: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

UploadLogo.defaultProps = {
  image: false,
  uploading: false,
};

export default UploadLogo;
