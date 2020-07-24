/* global window: false, localStorage: false */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';

import CreateBusinessLayout from '../Layouts/create-business';
import Appbar from '../AppBars/create-presentation';
import PresentationForm from '../Forms/presentation';


const UPDATE_PRESENTATION = loader('../../requests/update-presentation.graphql');

let touched = false;
const validationErrors = {};
const UpdatePresentation = (props) => {
  const user = JSON.parse(localStorage.user);

  const {
    match: { params: { id } },
    location: { state },
  } = props;

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(state.logo ? state.logo.src : null);
  const [description, setDescription] = useState(state.description ? state.description : null);

  const [updatepresentation, { loading, error, data }] = useMutation(UPDATE_PRESENTATION);

  if (data) {
    return (
      <Redirect
        push
        to={{ pathname: `/${id}`, state: { reload: true, mode: 'edit' } }}
      />
    );
  }

  if (error && !touched) {
    const { graphQLErrors } = error;

    if (graphQLErrors && graphQLErrors.length) {
      const { validationErrors: serverValidationErrors } = graphQLErrors[0].extensions;

      serverValidationErrors.map(({ code }) => {
        validationErrors[code] = 1;
        return null;
      });
    }
  }

  const errors = {}; // { DESCRIPTION_EMPTY: 1 };

  const onChange = (event) => {
    const { name, value, files } = event.target;

    touched = true;
    switch (name) {
      case 'image':
        if (files.length > 0) {
          setImage(files[0]);
          setUrl(window.URL.createObjectURL(files[0]));
          setUploading(false);
        }
        break;
      case 'description':
        validationErrors.DESCRIPTION_EMPTY = 0;
        setDescription(value);
        break;
      default:
        break;
    }
  };

  return (
    <CreateBusinessLayout
      appbar={(className) => <Appbar classes={{ root: className }} id={id} />}
      header={() => null}
      content={(className) => (
        <div className={className}>
          <PresentationForm
            uploading={uploading}
            image={url}
            description={description}
            submitting={loading}
            errors={{ ...errors, ...validationErrors }}
            onUploadStart={() => setUploading(true)}
            onChange={onChange}
            submit={() => {
              updatepresentation({
                variables: {
                  user: user.id, business: id, logo: image, description,
                }
              });
            }}
          />
        </div>
      )}
    />
  );
};

UpdatePresentation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      logo: PropTypes.shape({
        src: PropTypes.string,
      }).isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default UpdatePresentation;
