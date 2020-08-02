/* global document: false */
import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Skeleton from '@material-ui/lab/Skeleton';

import ShareIcon from '@material-ui/icons/Share';

import { makeStyles, fade } from '@material-ui/core/styles';

import BackgroundImage from '../background-image';
import Portrait from '../portrait';
import businessIcon from '../business-icon';
import DetailledFollowButton from '../Buttons/detailled-follow';
import DetailledLikeButton from '../Buttons/detailled-like';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.only('sm')]: {
      maxWidth: document.body.clientWidth - 20,
    },
  },
  image: {
    height: 200,
    backgroundPosition: 'top left',
  },
  shady: {
    boxSizing: 'border-box',
    height: 100,
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: fade(theme.palette.common.black, 0.5),
    padding: '18px 1px 1px 202px',
    [theme.breakpoints.only('sm')]: {
      padding: '18px 1px 1px 170px',
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
  longname: {
    color: '#fff',
  },
  actionsContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    flexGrow: 1,
  },
  category: {
    color: '#fff',
    marginRight: theme.spacing(2),
  },
  likes: {
    color: '#fff',
  },
  tabs: {
    marginLeft: 202,
    [theme.breakpoints.only('sm')]: {
      marginLeft: 170,
    },
  },
}));

const formatCategory = (category) => {
  switch (category) {
    case 'STARTUP':
      return 'Start-Up';
    case 'RESIDENCE':
      return 'Résidence';
    case 'RESTAURANT':
      return 'Restaurant';
    case 'ECOLE':
      return 'École';
    case 'SUPERMARCHE':
      return 'Supermarché';
    case 'CINEMA':
      return 'Cinéma';
    default:
      return undefined;
  }
};

const tabToTabIndex = (tab) => {
  switch (tab) {
    case 'presentation':
      return 0;
    case 'related':
      return 1;
    case 'posts':
      return 4;
    case 'images':
      return 2;
    case 'stops':
      return 3;
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
    case 4:
      return 'posts';
    case 2:
      return 'images';
    case 3:
      return 'stops';
    default:
      return undefined;
  }
};

const Header = (props) => {
  const {
    connected,
    alt, src, category,
    longname, follower, followers,
    liked, likes, tab,
    relatedNumber, postsNumber,
    imagesNumber, stopsNumber,
    onSubscribe, onUnsubscribe, onShare,
    onLike, onDislike, onTabSelected,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <Paper
      classes={{ root: classes.root }}
      square
    >
      <BackgroundImage
        classes={{ root: classes.image }}
        alt={alt}
        src={src}
        loading={<Skeleton variant="rect" width="100%" height="100%" />}
        error={<Portrait classes={{ root: classes.image }} />}
      />
      <div className={classes.shady}>
        <Portrait
          classes={{ root: classes.portrait }}
          icon={businessIcon(category)}
        />
        <Typography
          classes={{ root: classes.longname }}
          component="div"
          variant="h5"
          title={longname}
          noWrap
        >
          {longname}
        </Typography>
        <div className={classes.actionsContainer}>
          <Typography
            classes={{ root: classes.category }}
            component="span"
            variant="h6"
            title={formatCategory(category)}
            noWrap
          >
            {formatCategory(category)}
          </Typography>
          <div className={classes.actions}>
            <DetailledFollowButton
              connected={connected}
              follower={follower}
              followers={followers}
              onSubscribe={onSubscribe}
              onUnsubscribe={onUnsubscribe}
            />
            <DetailledLikeButton
              connected={connected}
              liked={liked}
              likes={likes}
              onLike={onLike}
              onDislike={onDislike}
            />
            <IconButton
              aria-label="share"
              onClick={onShare}
            >
              <ShareIcon style={{ color: '#fff' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={classes.tabs}>
        <Tabs
          variant="scrollable"
          value={tabToTabIndex(tab)}
          onChange={(_, tabIndex) => onTabSelected(tabIndexToTab(tabIndex))}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="PRESENTATION" />
          <Tab label={`PAGES RELIEES (${relatedNumber})`} />
          <Tab label={`PHOTOS (${imagesNumber})`} />
          <Tab label={`ARRETS (${stopsNumber})`} />
          <Tab label={`POSTS (${postsNumber})`} />
        </Tabs>
      </div>
    </Paper>
  );
};

Header.propTypes = {
  connected: PropTypes.bool,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  category: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  follower: PropTypes.bool,
  followers: PropTypes.number.isRequired,
  liked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  tab: PropTypes.oneOf(['presentation', 'related', 'posts', 'images', 'stops']),
  relatedNumber: PropTypes.number,
  postsNumber: PropTypes.number,
  imagesNumber: PropTypes.number,
  stopsNumber: PropTypes.number,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onTabSelected: PropTypes.func.isRequired,
};

Header.defaultProps = {
  connected: false,
  src: null,
  follower: false,
  liked: false,
  tab: 'presentation',
  relatedNumber: 0,
  postsNumber: 0,
  imagesNumber: 0,
  stopsNumber: 0,
};

export default Header;
