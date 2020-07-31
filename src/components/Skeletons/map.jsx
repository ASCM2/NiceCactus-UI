import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
});

const MapSkeleton = (props) => {
  const classes = useStyles(props);

  return (
    <Skeleton classes={{ root: classes.root }} variant="rect" animation="wave" />
  );
};

export default MapSkeleton;
