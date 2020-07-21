import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  shady: {
    height: 100,
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    padding: '18px 10px 1px 202px',
    [theme.breakpoints.only('sm')]: {
      padding: '18px 10px 1px 170px',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  portrait: {
    height: 150,
    width: 140,
    position: 'absolute',
    top: 18,
    left: 31,
    [theme.breakpoints.only('sm')]: {
      left: 15,
    },
  },
  actionsContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  tabs: {
    marginLeft: 202,
    [theme.breakpoints.only('sm')]: {
      marginLeft: 170,
    },
  },
}));

const tabToTabIndex = (tab) => {
  switch (tab) {
    case 'presentation':
      return 0;
    case 'related':
      return 1;
    case 'posts':
      return 2;
    case 'images':
      return 3;
    case 'stops':
      return 4;
    default:
      return undefined;
  }
};

const tabIndexToTab = (tabIndex) => {
  switch (tabIndex) {
    case 0:
      return 'presentation';
    case 1:
      return 'related';
    case 2:
      return 'posts';
    case 3:
      return 'images';
    case 4:
      return 'stops';
    default:
      return undefined;
  }
};

const HeaderSkeleton = (props) => {
  const {
    tab,
    onTabSelected,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <Paper
      classes={{ root: classes.root }}
      square
    >
      <Skeleton variant="rect" width="100%" height={200} />
      <Paper
        classes={{ root: classes.shady }}
        square
        elevation={0}
      >
        <Paper
          classes={{ root: classes.portrait }}
        >
          <Skeleton variant="rect" width="100%" height="100%" animation="wave" />
        </Paper>
        <Skeleton variant="text" animation="wave" />
        <div className={classes.actionsContainer}>
          <Skeleton variant="text" width={120} animation="wave" />
          <Skeleton variant="rect" width={100} height={35} animation="wave" />
          <Skeleton variant="circle" width={35} height={35} animation="wave" />
          <Skeleton variant="circle" width={35} height={35} animation="wave" />
        </div>
      </Paper>
      <div className={classes.tabs}>
        <Tabs
          variant="scrollable"
          value={tabToTabIndex(tab)}
          onChange={(_, tabIndex) => onTabSelected(tabIndexToTab(tabIndex))}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="PRESENTATION" />
          <Tab label="PAGES RELIEES" />
          <Tab label="POSTS" />
          <Tab label="PHOTOS" />
          <Tab label="ARRETS" />
        </Tabs>
      </div>
    </Paper>
  );
};

HeaderSkeleton.propTypes = {
  tab: PropTypes.oneOf(['presentation', 'related', 'posts', 'images', 'stops']),
  onTabSelected: PropTypes.func.isRequired,
};

HeaderSkeleton.defaultProps = {
  tab: 'presentation',
};

export default HeaderSkeleton;
