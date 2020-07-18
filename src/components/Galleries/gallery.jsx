import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import AddImagesIcon from '@material-ui/icons/AddAPhoto';

import { makeStyles, fade } from '@material-ui/core/styles';

import Slider from '../slider';
import UploadButton from '../Buttons/upload-images-button';
import Image from '../ImagesCustomisers/image';


const useStyles = makeStyles((theme) => ({
  root: ({ mode, noImages }) => {
    if (mode === 'edit' && noImages) {
      return {
        display: 'flex',
        justifyContent: 'center',
      };
    }

    return { padding: '0 50px' };
  },
  controls: {
    height: 60,
    width: 60,
    backgroundColor: fade(theme.palette.background.paper, 0.95),
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  editSectionContainer: {
    paddingTop: 15,
    height: ({ noImages }) => (noImages ? 200 : 250),
    width: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: -12,
  },
  editSectionIcon: {
    width: 120,
    height: 120,
  },
  editSectionUpload: {
    marginTop: 10,
  },
}));

const BusinessGallery = (props) => {
  const {
    mode, alt, images, uploading,
    onUploadStart, onFileUploaded,
    ...rest
  } = props;
  const [itemsLoaded, setItemsLoaded] = useState(0);
  const Images = images.map(({
    src, liked, likes,
  }) => (
    <Image
      mode={mode}
      alt={alt}
      src={src}
      liked={liked}
      likes={likes}
      onLoad={() => { setItemsLoaded(itemsLoaded + 1); }}
    />
  ));
  const noImages = Boolean(Images.length === 0);
  const classes = useStyles({ mode, noImages, ...rest });

  if (Images.length === 0 && mode === 'view') return null;

  const editSection = (
    <div className={classes.editSectionContainer}>
      <div className={classes.editSection}>
        <AddImagesIcon
          classes={{ root: classes.editSectionIcon }}
          color="secondary"
        />
        <UploadButton
          classes={{ root: classes.editSectionUpload }}
          uploading={uploading}
          onUploadStart={onUploadStart}
          onFileUploaded={onFileUploaded}
        />
      </div>
    </div>
  );

  return (
    <Paper
      classes={{ root: classes.root }}
      elevation={1}
    >
      {noImages && editSection}
      {!noImages && (
        <Slider
          itemsLoaded={itemsLoaded}
          padding={15}
          spacing={10}
          items={mode === 'edit' ? [editSection, ...Images] : Images}
          left={(className, prev) => (
            <Paper
              classes={{ root: clsx(className, classes.controls) }}
              onClick={prev}
            >
              <LeftArrowIcon />
            </Paper>
          )}
          right={(className, next) => (
            <Paper
              classes={{ root: clsx(className, classes.controls) }}
              onClick={next}
            >
              <RightArrowIcon />
            </Paper>
          )}
          moveLen={300}
        />
      )}
    </Paper>
  );
};

BusinessGallery.propTypes = {
  mode: PropTypes.oneOf(['view', 'edit']),
  alt: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    liked: PropTypes.bool,
    likes: PropTypes.number.isRequired,
  })),
  uploading: PropTypes.bool,
  onUploadStart: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

BusinessGallery.defaultProps = {
  mode: 'view',
  images: [],
  uploading: false,
};

export default BusinessGallery;
