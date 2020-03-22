import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    minHeight: 200,
  },
});

const Loading = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
