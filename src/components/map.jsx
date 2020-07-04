import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import CustomMarker from './marker';


const useStyles = makeStyles({
  root: { position: 'relative' },
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
  },
});

const Map = (props) => {
  const { lat, lng, ...rest } = props;
  const classes = useStyles({ ...rest });
  const [viewport, setViewPort] = useState(
    {
      width: '100%',
      height: '100%',
      latitude: lat,
      longitude: lng,
      zoom: 7,
    },
  );
  const {
    width,
    height,
    latitude,
    longitude,
    zoom,
  } = viewport;

  const marker = <CustomMarker lat={lat} lng={lng} />;

  return (
    <Paper className={classes.root} square>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        width={width}
        height={height}
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        onViewportChange={(vport) => setViewPort(vport)}
      >
        {marker}
        <div className={classes.nav}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </Paper>
  );
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Map;
