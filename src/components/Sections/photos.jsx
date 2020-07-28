/* global localStorage: false */
import React from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';

import UploadButton from '../Buttons/upload-images-button';
import CheckboardLayout from '../Layouts/checkboard';
import Photo from '../ImagesCustomisers/photo';


const useStyles = makeStyles({
  root: {},
  editContainer: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

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
const Photos = (props) => {
  const user = JSON.parse(localStorage.user);
  const connected = Boolean(user.roles.find((role) => role === 'user'));

  const {
    id: businessId,
    uploading, owner, mode,
    shortname, images,
    onUploadStart, onFileUploaded,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

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

  return (
    <div className={classes.root}>
      {owner && mode === 'edit' && (
        <div className={classes.editContainer}>
          <UploadButton
            classes={{ root: classes.editSectionUpload }}
            uploading={uploading}
            onUploadStart={onUploadStart}
            onFileUploaded={onFileUploaded}
          />
        </div>
      )}
      <CheckboardLayout
        classes={{ root: classes.root }}
        items={images.map(({
          id, src, likes, liked
        }) => (
          <Photo
            key={id}
            connected={connected}
            mode={mode}
            alt={`Photo de ${shortname}`}
            src={src}
            likes={likes}
            liked={liked}
            onLike={() => {
              like({ variables: { user: user.id, business: businessId, image: id } });
            }}
            onDislike={() => {
              dislike({ variables: { user: user.id, business: businessId, image: id } });
            }}
            onDelete={() => {
              deletedImage = id;
              deleteImage({ variables: { user: user.id, business: businessId, image: id } });
            }}
          />
        ))}
      />
    </div>
  );
};

Photos.propTypes = {
  id: PropTypes.string.isRequired,
  uploading: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']),
  owner: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onUploadStart: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

Photos.defaultProps = {
  uploading: false,
  mode: 'view',
  owner: false,
};

export default Photos;
