import React from 'react';

import Paper from '@material-ui/core/Paper';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {},
  shortnameContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    marginBottom: 35,
  },
  icon: {
    height: 'inherit',
    width: 60,
    marginRight: theme.spacing(1),
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: 120,
    width: 380,
  },
  descriptionContainer: {
    marginTop: 35,
    height: 320,
  },
}));

const PresentationSkeleton = (props) => {
  const classes = useStyles(props);

  return (
    <Paper
      classes={{ root: classes.root }}
      square
    >
      <div className={classes.shortnameContainer}>
        <div className={classes.icon}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
        <Skeleton variant="rect" width="100%" height={35} animation="wave" />
      </div>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
      </div>
      <div className={classes.descriptionContainer}>
        {Array(15).fill(null).map(() => <Skeleton variant="text" animation="wave" />)}
      </div>
    </Paper>
  );
};

export default PresentationSkeleton;
