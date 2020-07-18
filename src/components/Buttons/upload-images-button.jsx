import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
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
    uploading, onUploadStart, onFileUploaded,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const label = 'Ajouter des images';

  return (
    <>
      <input
        accept="image/*"
        multiple
        className={classes.input}
        id="upload-button-file-input"
        name="images"
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
          <Typography classes={{ root: classes.label }} variant="inherit">
            {label}
          </Typography>
        </Button>
      </label>
    </>
  );
};

Upload.propTypes = {
  uploading: PropTypes.bool,
  onUploadStart: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

Upload.defaultProps = {
  uploading: false,
};

export default Upload;
