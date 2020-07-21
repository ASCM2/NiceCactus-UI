/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { loader } from 'graphql.macro';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

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

const LIKE_IMAGE = loader('../../requests/like-image.graphql');
const DISLIKE_IMAGE = loader('../../requests/dislike-image.graphql');
const DELETE_IMAGE = loader('../../requests/delete-image.graphql');
const QUERY_IMAGES = gql`
  query queryImages($user: ID!, $business: ID!) {
    business(user: $user, id: $business) {
      id
      images {
        id
        src
        liked
        likes
      }
    }
  }
`;

let deletedImage;
const BusinessGallery = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));

  const {
    id: businessId,
    mode, alt, images, uploading,
    onUploadStart, onFileUploaded,
    ...rest
  } = props;
  const [itemsLoaded, setItemsLoaded] = useState(0);

  const [like] = useMutation(LIKE_IMAGE);
  const [dislike] = useMutation(DISLIKE_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE, {
    update: (cache) => {
      const { business } = cache.readQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: businessId }
      });
      const filteredImages = business.images.filter(({ id: imageId }) => imageId !== deletedImage);

      cache.writeQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: businessId },
        data: {
          business: { ...business, images: filteredImages },
        }
      });
    }
  });
  const Images = images.map(({
    id, src, liked, likes,
  }) => (
    <Image
      connected={connected}
      mode={mode}
      alt={alt}
      src={src}
      liked={liked}
      likes={likes}
      onLike={() => { like({ variables: { user: user.id, business: businessId, image: id } }); }}
      onDislike={
        () => { dislike({ variables: { user: user.id, business: businessId, image: id } }); }
      }
      onDelete={
        () => {
          deletedImage = id;
          deleteImage({ variables: { user: user.id, business: businessId, image: id } });
        }
      }
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
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['view', 'edit']),
  alt: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
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
