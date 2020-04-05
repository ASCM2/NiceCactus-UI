/* Tests (début)

    1) Vérifier que lorsque l'on est non connecté, le composant prend sa forme par
       défaut et requière au clic la connexion de l'utilisateur courant.
    2) Vérifier que lorsque l'on est connecté et abonné, le composant prend sa forme "Abonné"
       et un clic sur le bouton "Abonné" déclenche la fonction de désouscription.
    3) Vérifier que lorsque l'on est connecté et non abonné, le composant prend sa forme
       "Non Abonné" et un clic sur le bouton "Abonné" déclenche l'abonnement.

    P.S: Effectuer un snapshot du composant pour chaque test portant sur ses props.

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {},
  follower: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[500],
    borderColor: theme.palette.grey[500],
  },
}));

const FollowButton = (props) => {
  const {
    connected, follower, askSignIn,
    onSubscribe, onUnsubscribe,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const follow = connected && follower;
  const onFollow = follower ? onUnsubscribe : onSubscribe;

  return (
    <Button
      className={follow ? classes.follower : classes.root}
      variant="outlined"
      color="primary"
      onClick={connected ? onFollow : askSignIn}
    >
      {follow ? 'Abonné' : 'Suivre'}
    </Button>
  );
};

FollowButton.propTypes = {
  /* A mettre à true si l'utilisateur courant est connecté et sinon false. */
  connected: PropTypes.bool,
  /* Indique si l'utilisateur courant est abonné à l'établissemnt ou pas. */
  follower: PropTypes.bool,
  /* Fonction réquérant la connexion de l'utilisateur. */
  askSignIn: PropTypes.func,
  /* Fonction déclenchée lorsque l'utilisateur clique sur le bouton "Suivre" */
  onSubscribe: PropTypes.func.isRequired,
  /* Fonction déclenchée lorsque l' utilisateur clique pour se désabonner de l'établissement */
  onUnsubscribe: PropTypes.func.isRequired,
};

FollowButton.defaultProps = {
  connected: false,
  follower: false,
  askSignIn: () => console.log('Vous devez vous connecter pour réaliser cette action.'),
};

export default FollowButton;
