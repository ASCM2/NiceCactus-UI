import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { NavigationControl, WebMercatorViewport } from 'react-map-gl';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import CustomMarker from './business-marker';


const useStyles = makeStyles({
  root: { position: 'relative' },
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
  },
});


let mapRef;
const Map = (props) => {
  const { locations, ...rest } = props;
  const classes = useStyles({ ...rest });
  const { coordinates: [mainLat, mainLng] } = locations.find(({ main }) => main);
  const [viewport, setViewPort] = useState(
    {
      width: '100%',
      height: '100%',
      latitude: mainLat,
      longitude: mainLng,
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

  const markers = locations.map(
    ({ main, coordinates: [lat, lng] }) => <CustomMarker main={main} lat={lat} lng={lng} />,
  );

  useEffect(() => {
    if (locations.length === 1) return;

    if (mapRef) {
      const mapWidth = mapRef.scrollWidth;
      const mapHeight = mapRef.scrollHeight;

      const coordinates = [
        [mainLat, mainLng],
        ...locations.map(({ coordinates: [lat, lng] }) => [lat, lng])
      ];
      const lats = coordinates.map(([lat]) => lat);
      const lngs = coordinates.map((location) => location[1]);
      const minLat = Math.min(...lats);
      const minLng = Math.min(...lngs);
      const maxLat = Math.max(...lats);
      const maxLng = Math.max(...lngs);

      const initViewport = new WebMercatorViewport({ width: mapWidth, height: mapHeight })
        .fitBounds([[minLng, minLat], [maxLng, maxLat]], {
          padding: 20,
          offset: [0, -100]
        });

      setViewPort({
        ...viewport,
        width: initViewport.width,
        height: initViewport.height,
        latitude: initViewport.latitude,
        longitude: initViewport.longitude,
        zoom: initViewport.zoom,
      });
    }
  }, []);

  return (
    <Paper ref={(el) => { mapRef = el; }} className={classes.root} square>
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
        {markers}
        <div className={classes.nav}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </Paper>
  );
};

Map.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    main: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired).isRequired,
};

export default Map;
