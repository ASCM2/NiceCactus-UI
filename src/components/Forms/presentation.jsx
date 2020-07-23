import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import WithImage from '../with-image';
import Portrait from '../portrait';
import UploadLogoButton from '../Buttons/upload-logo';


const mediaHeight = 170;
const useStyles = makeStyles({
  root: { width: '100%', maxWidth: 960 },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    height: mediaHeight,
  },
  media: {
    width: '100%',
    height: mediaHeight,
  },
  upload: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const PresentationForm = (props) => {
  const {
    image, uploading, submitting,
    description, errors,
    onUploadStart, onChange, submit,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  const media = (
    <WithImage
      classes={{ root: classes.media }}
      mediaLoading={false}
      mediaError={Boolean(!image)}
      component={<CardMedia classes={{ root: classes.media }} image={image} />}
      error={<Portrait classes={{ root: classes.media }} />}
      loading={<div />}
    />
  );

  const descriptionError = Boolean(errors.DESCRIPTION_EMPTY);

  const submitLabel = 'Soumettre';

  return (
    <Card classes={{ root: classes.root }}>
      <div className={classes.mediaContainer}>
        {media}
        <UploadLogoButton
          classes={{ root: classes.upload }}
          uploading={uploading}
          image={Boolean(image)}
          onUploadStart={onUploadStart}
          onFileUploaded={onChange}
        />
      </div>
      <CardContent>
        <TextField
          fullWidth
          required
          variant="outlined"
          multiline
          rows={10}
          rowsMax={20}
          id="description"
          name="description"
          label="Présentez-vous"
          value={description || ''}
          helperText="*Requis"
          error={descriptionError}
          onChange={onChange}
        />
      </CardContent>
      <CardActions
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          disabled={submitting}
          color="primary"
          variant="contained"
          onClick={submit}
        >
          {submitLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

PresentationForm.propTypes = {
  uploading: PropTypes.bool,
  image: PropTypes.string,
  description: PropTypes.string,
  submitting: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    DESCRIPTION_EMPTY: PropTypes.number,
  }),
  onUploadStart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

PresentationForm.defaultProps = {
  uploading: false,
  image: null,
  description: null,
  submitting: false,
  errors: {},
};

export default PresentationForm;

/*
export default (props) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState(null);

  const errors = {}; // { DESCRIPTION_EMPTY: 1 };

  const onChange = (event) => {
    const { name, value, files } = event.target;

    switch (name) {
      case 'image':
        if (files.length > 0) {
          setImage(files[0]);
          setUrl(window.URL.createObjectURL(files[0]));
          setUploading(false);
        }
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  return (
    <PresentationForm
      uploading={uploading}
      image={url}
      description={description}
      errors={errors}
      onUploadStart={() => setUploading(true)}
      onChange={onChange}
      submit={() => { alert(JSON.stringify({ image, description })) }}
      {...props}
    />
  );
};
*/
