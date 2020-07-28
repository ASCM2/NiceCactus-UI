import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles, fade } from '@material-ui/core/styles';

import BackgroundImage from '../background-image';
import LikeButton from '../Buttons/like-button';


const borderRadius = 20;
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    width: '100%',
    borderRadius,
    '&:hover $likesContainer': {
      visibility: 'visible',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius,
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
    borderRadius,
  },
}));

const Photo = (props) => {
  const {
    connected,
    mode, alt, src,
    liked, likes,
    onLike, onDislike, onDelete,
    ...rest
  } = props;
  const [error, setError] = useState(false);
  const classes = useStyles({ ...rest });

  if (error) return null;

  const deleteButton = (
    <div>
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon color="secondary" />
      </IconButton>
    </div>
  );

  return (
    <Paper
      classes={{ root: classes.root }}
      elevation={8}
    >
      <BackgroundImage
        classes={{ root: classes.image }}
        alt={alt}
        src={src}
        loading={<Skeleton style={{ borderRadius }} variant="rect" width="100%" height="100%" />}
        error={null}
        onError={() => setError(true)}
      />
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
    </Paper>
  );
};

Photo.propTypes = {
  connected: PropTypes.bool,
  mode: PropTypes.oneOf(['view', 'edit']),
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  liked: PropTypes.bool,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Photo.defaultProps = {
  connected: false,
  mode: 'view',
  liked: false,
};

export default Photo;
