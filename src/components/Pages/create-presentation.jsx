import React from 'react';
import PropTypes from 'prop-types';

import CreateBusinessLayout from '../Layouts/create-business';
import Appbar from '../AppBars/create-business';


const CreatePresentation = (props) => {
  const { match: { params: { id } } } = props;

  return (
    <CreateBusinessLayout
      appbar={(className) => (
        <Appbar
          classes={{ root: className }}
          step="basics"
        />
      )}
      header={() => null}
      content={() => null}
    />
  );
};

CreatePresentation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
}

export default CreatePresentation;
