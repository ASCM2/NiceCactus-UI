import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {},
});

const DetailsFollowButton = (props) => {
  const {
    connected, follower, followers,
    askSignIn, onSubscribe, onUnsubscribe,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const follow = connected && follower;
  const onFollow = follower ? onUnsubscribe : onSubscribe;

  return (
    <Button
      className={classes.root}
      variant="contained"
      color={follow ? 'default' : 'primary'}
      onClick={connected ? onFollow : askSignIn}
    >
      {follow ? `Abonné (${followers})` : `Suivre (${followers})`}
    </Button>
  );
};

DetailsFollowButton.propTypes = {
  connected: PropTypes.bool,
  follower: PropTypes.bool,
  followers: PropTypes.number.isRequired,
  askSignIn: PropTypes.func,
  onSubscribe: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};

DetailsFollowButton.defaultProps = {
  connected: false,
  follower: false,
  askSignIn: () => alert('Vous devez vous connecter pour réaliser cette action.'),
  onSubscribe: () => alert('Vous venez de vous abonner à cet établissement.'),
  onUnsubscribe: () => alert('Vous êtes en train de vous désabonner de cet établissement.'),
};

export default DetailsFollowButton;
