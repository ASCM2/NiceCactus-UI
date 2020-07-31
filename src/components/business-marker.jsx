import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';

import PlaceIcon from '@material-ui/icons/Place';


const CustomMarker = (props) => {
  const { main, lat, lng } = props;

  return (
    <Marker latitude={lat} longitude={lng}>
      <PlaceIcon
        style={{
          position: 'relative',
          top: 4,
          fontSize: main ? '45px' : '30px',
          transform: 'translate(-50%, -100%)',
        }}
        color={main ? 'primary' : 'secondary'}
      />
    </Marker>
  );
};

CustomMarker.propTypes = {
  main: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default CustomMarker;
