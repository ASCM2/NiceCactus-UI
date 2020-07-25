import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


const iconSize = 40;
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    maxWidth: 400,
  },
  header: {
    display: 'flex',
    padding: 16,
  },
  icon: {
    height: iconSize,
    width: iconSize,
    marginRight: theme.spacing(1),
  },
  headerContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  image: {
    height: 180,
  },
  smalldescription: {
    marginTop: theme.spacing(1),
    height: 60,
  },
  actions: {
    display: 'flex',
    padding: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

const RelatedSkeleton = (props) => {
  const classes = useStyles(props);

  return (
    <Paper
      classes={{ root: classes.root }}
      square
    >
      <div className={classes.header}>
        <div className={classes.icon}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
        <div className={classes.headerContent}>
          <Skeleton variant="rect" width="100%" height={15} animation="wave" />
          <Skeleton variant="rect" width="100%" height={15} animation="wave" />
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.image}>
          <Skeleton variant="rect" width="100%" height="100%" />
        </div>
        <div className={classes.smalldescription}>
          <Skeleton variant="text" width="100%" animation="wave" />
          <Skeleton variant="text" width="100%" animation="wave" />
          <Skeleton variant="text" width={180} animation="wave" />
        </div>
      </div>
      <div className={classes.actions}>
        <Skeleton variant="rect" width={100} height={35} animation="wave" />
        <Skeleton variant="circle" width={35} height={35} animation="wave" />
      </div>
    </Paper>
  );
};

export default RelatedSkeleton;
