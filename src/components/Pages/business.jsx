/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';

import AppBar from '../AppBars/business';
import AppBarSkeleton from '../Skeletons/business-appbar';
import Layout from '../Layouts/business';
import Gallery from '../Galleries/business-gallery';
import GallerySkeleton from '../Skeletons/business-gallery';


const QUERY_BUSINESS = loader('../../requests/query-business.graphql');
const UPLOAD_IMAGES = loader('../../requests/upload-images.graphql');
const QUERY_IMAGES = gql`
  query queryImages($user: ID!, $business: ID!) {
    business(user: $user, id: $business) {
      images {
        id
        src
        liked
        likes
      }
    }
  }
`;

const Business = (props) => {
  const user = JSON.parse(localStorage.user);

  const { match: { params: { id } }, history } = props;
  const [mode, setMode] = useState('view');
  const [clientFilesUploading, setClientFilesUploading] = useState(false);
  const {
    loading, data,
  } = useQuery(QUERY_BUSINESS, { variables: { user: user.id, business: id } });
  const [upload, { loading: serverFilesUploading }] = useMutation(UPLOAD_IMAGES, {
    update: (cache, { data: { addimages: addedImages } }) => {
      const { business } = cache.readQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: id }
      });

      cache.writeQuery({
        query: QUERY_IMAGES,
        variables: { user: user.id, business: id },
        data: {
          business: { ...business, images: [...addedImages, ...business.images] },
        }
      });
    }
  });

  const uploading = clientFilesUploading || serverFilesUploading;

  let images = [];
  let shortname;
  let longname;
  let owner;

  if (data) {
    const { business } = data;

    images = business.images;
    shortname = business.shortname;
    longname = business.longname;
    owner = business.owner;
  }

  return (
    <Layout
      mode={mode}
      appbar={(className) => {
        if (loading) return <AppBarSkeleton classes={{ root: className }} />;

        return (
          <AppBar
            classes={{ root: className }}
            mode={mode}
            flat={mode === 'edit' || images.length > 0}
            shortname={shortname}
            longname={longname}
            owner={user.id === owner}
            toggleMode={() => {
              if (mode === 'view') {
                setMode('edit');
              } else if (mode === 'edit') {
                setMode('view');
              }
            }}
            back={() => {
              history.push('/');
            }}
          />
        );
      }}
      gallery={(className) => {
        if (loading) return <GallerySkeleton classes={{ root: className }} />;

        return (
          <Gallery
            classes={{ root: className }}
            uploading={uploading}
            id={id}
            mode={mode}
            alt={`Image de galerie de ${shortname}`}
            images={images}
            onUploadStart={() => { setClientFilesUploading(true); }}
            onFileUploaded={(event) => {
              setClientFilesUploading(false);
              upload({
                variables: {
                  user: user.id,
                  business: id,
                  images: event.target.files,
                },
              });
            }}
          />
        );
      }}
    />
  );
};

Business.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Business;
