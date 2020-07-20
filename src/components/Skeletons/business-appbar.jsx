import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  colorDefault: { backgroundColor: theme.palette.background.paper },
  root: {
    display: 'flex',
  },
  header: {
    flexGrow: 1,
    marginRight: 50,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const BusinessAppBarSkeleton = (props) => {
  const classes = useStyles(props);

  return (
    <AppBar
      classes={{ colorDefault: classes.colorDefault }}
      position="static"
      color="default"
      elevation={1}
    >
      <Toolbar classes={{ root: classes.root }}>
        <Skeleton variant="circle" animation="wave" width={50} height={50} />
        <div className={classes.header}>
          <Skeleton variant="text" animation="wave" width={320} height={50} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessAppBarSkeleton;
