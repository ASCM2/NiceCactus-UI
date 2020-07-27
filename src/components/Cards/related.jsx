import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

import Skeleton from '@material-ui/lab/Skeleton';

import LocationIcon from '@material-ui/icons/Place';

import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import BackgroundImage from '../background-image';
import Portrait from '../portrait';
import FollowButton from '../Buttons/follow-button';
import LikeButton from '../Buttons/like-button';
import businessIcon from '../business-icon';


const iconSize = 40;
const locationIconColor = blue[300];
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    maxWidth: 400,
  },
  header: {
    paddingBottom: 0,
  },
  icon: {
    height: iconSize,
    width: iconSize,
    backgroundSize: 'contain',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  shortname: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    margin: '0 5px',
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
    color: locationIconColor,
  },
  city: {
    marginLeft: 2,
    width: 295,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  image: {
    height: 180,
    width: '100%',
  },
  smalldescription: {
    marginTop: theme.spacing(1),
    height: 60,
    overflow: 'hidden',
  },
  actions: {
    paddingLeft: 16,
    paddingRight: 16,
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

const Related = (props) => {
  const {
    connected,
    icon, shortname, category,
    city, image, smalldescription,
    follower, liked, likes,
    onSubscribe, onUnsubscribe,
    onLike, onDislike,
    ...rest
  } = props;
  const [raised, setRaised] = useState(false);
  const classes = useStyles({ ...rest });
  const Icon = businessIcon(category);

  return (
    <Card
      classes={{ root: classes.root }}
      square
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
      onFocus={() => setRaised(true)}
      onBlur={() => setRaised(false)}
    >
      <CardHeader
        classes={{ root: classes.header }}
        disableTypography
        avatar={(
          <BackgroundImage
            classes={{ root: classes.icon }}
            alt={icon.alt}
            src={icon.src}
            loading={<Skeleton variant="rect" width="100%" height="100%" />}
            error={null}
          />
        )}
        title={(
          <div className={classes.title}>
            <Typography
              classes={{ root: classes.shortname }}
              variant="body1"
              color="textSecondary"
              component="div"
            >
              {`${shortname} -`}
              <Icon classes={{ root: classes.titleIcon }} color="inherit" />
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="div"
            >
              {formatCategory(category)}
            </Typography>
          </div>
        )}
        subheader={(
          <div className={classes.subheader}>
            <LocationIcon />
            <div className={classes.city} title={city}>
              {city}
            </div>
          </div>
        )}
      />
      <CardContent>
        <BackgroundImage
          classes={{ root: classes.image }}
          alt={image.alt}
          src={image.src}
          loading={<Skeleton variant="rect" width="100%" height="100%" />}
          error={<Portrait icon={Icon} classes={{ root: classes.image }} />}
        />
        <Typography
          classes={{ root: classes.smalldescription }}
          title={smalldescription}
          variant="body2"
          component="div"
          color="textSecondary"
        >
          {smalldescription}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.actions }}>
        <FollowButton
          connected={connected}
          follower={follower}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
        <LikeButton
          connected={connected}
          liked={liked}
          likes={likes}
          onLike={onLike}
          onDislike={onDislike}
        />
      </CardActions>
    </Card>
  );
};

Related.propTypes = {
  connected: PropTypes.bool,
  icon: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
  }).isRequired,
  shortname: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  image: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
  }).isRequired,
  smalldescription: PropTypes.string.isRequired,
  follower: PropTypes.bool,
  liked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

Related.defaultProps = {
  connected: false,
  follower: false,
  liked: false,
};

export default Related;
