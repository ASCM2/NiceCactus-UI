import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles, fade } from '@material-ui/core/styles';

import LikeButton from '../Buttons/like-button';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: ({ height }) => height,
    display: 'inline-block',
    zIndex: 1,
    '&:hover $likesContainer': {
      visibility: 'visible',
    },
  },
  image: {
    height: '100%',
    width: 'auto',
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  likesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    zIndex: 3,
    backgroundColor: fade(theme.palette.background.paper, 0.85),
    padding: 10,
    visibility: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Image = (props) => {
  const {
    mode,
    height, alt, src,
    connected, liked, likes,
    onLike, onDislike, onDelete,
    onLoad,
    ...rest
  } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const classes = useStyles({ height, ...rest });

  if (error) return null;

  const deleteButton = (
    <div>
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon color="secondary" />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        alt={alt}
        src={src}
        onLoad={() => { setLoading(false); onLoad(); }}
        onError={() => setError(true)}
      />
      {loading && (
        <Skeleton
          classes={{ root: classes.skeleton }}
          variant="rect"
          width="100%"
          height="100%"
        />
      )}
      <div className={classes.likesContainer}>
        {mode === 'view' && (
          <LikeButton
            connected={connected}
            liked={liked}
            likes={likes}
            onLike={onLike}
            onDislike={onDislike}
          />
        )}
        {mode === 'edit' && deleteButton}
      </div>
    </div>
  );
};

Image.propTypes = {
  mode: PropTypes.oneOf(['view', 'edit']),
  height: PropTypes.number,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  connected: PropTypes.bool,
  liked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
};

Image.defaultProps = {
  mode: 'view',
  connected: false,
  height: 250,
  liked: false,
  onLoad: () => {},
};

export default Image;
