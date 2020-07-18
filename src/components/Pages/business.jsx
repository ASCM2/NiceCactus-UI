/* global localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/react-hooks';

import AppBar from '../AppBars/business';
import Layout from '../Layouts/business';
import Gallery from '../Galleries/gallery';


const QUERY_BUSINESS = loader('../../requests/query-business.graphql');
const UPLOAD_IMAGES = loader('../../requests/upload-images.graphql');
const user = JSON.parse(localStorage.user);

const Business = (props) => {
  const { match: { params: { id } }, history } = props;
  const [mode, setMode] = useState('view');
  const [uploading, setUploading] = useState(false);
  const {
    loading, error, data,
  } = useQuery(QUERY_BUSINESS, { variables: { user: user.id, business: id } });
  const [upload,
    { error: uploadError, data: uploadData },
  ] = useMutation(UPLOAD_IMAGES);
  let addedImages = [];

  if (loading) return null;

  if (uploadData) {
    addedImages = uploadData.addimages;
    if (uploading) { setUploading(false); }
  }

  console.log('upload error: ');
  console.log(uploadError);
  console.log('error: ');
  console.log(error);
  console.log('data: ');
  console.log(data);

  const {
    business: {
      images: businessImages, shortname, longname, owner,
    }
  } = data;
  const images = [...addedImages, ...businessImages]

  return (
    <Layout
      mode={mode}
      appbar={(className) => (
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
            history.goBack(-1);
          }}
        />
      )}
      gallery={(className) => (
        <Gallery
          classes={{ root: className }}
          uploading={uploading}
          mode={mode}
          alt={`Image de galerie de ${shortname}`}
          images={images}
          onUploadStart={() => setUploading(true)}
          onFileUploaded={(event) => {
            upload({
              variables: {
                user: user.id,
                business: id,
                images: event.target.files,
              },
            });
          }}
        />
      )}
    />
  );
};

Business.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Business;
