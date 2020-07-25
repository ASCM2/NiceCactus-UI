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

const Upload = (props) => {
  const {
    image, uploading, onUploadStart,
    onFileUploaded, ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const label = image ? 'Modifier votre icône' : 'Ajouter une icône';

  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-logo-file-input"
        name="image"
        type="file"
        onChange={onFileUploaded}
      />
      {uploading && (
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={classes.root}
        >
          <CircularProgress color="primary" />
        </div>
      )}
      <label htmlFor="upload-logo-file-input">
        <Button
          style={{ color: '#fff', display: uploading ? 'none' : undefined }}
          classes={{ root: classes.root }}
          variant="contained"
          color="primary"
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

Upload.propTypes = {
  image: PropTypes.bool,
  uploading: PropTypes.bool,
  onUploadStart: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  image: false,
  uploading: false,
};

export default Upload;
