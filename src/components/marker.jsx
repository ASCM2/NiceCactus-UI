import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';

import PlaceIcon from '@material-ui/icons/Place';


const CustomMarker = (props) => {
  const { lat, lng } = props;

  return (
    <Marker latitude={lat} longitude={lng}>
      <PlaceIcon
        style={{
          position: 'relative',
          top: 4,
          fontSize: '45px',
          transform: 'translate(-50%, -100%)',
        }}
        color="primary"
      />
    </Marker>
  );
};

CustomMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default CustomMarker;
