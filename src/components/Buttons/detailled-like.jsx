/* Tests (début)

    1) Vérifier que lorsque l'on est non connecté, le composant prend sa forme "Non Aimé"
       det requière au clic la connexion de l'utilisateur courant.
    2) Vérifier que lorsque l'on est connecté et ayant liké, le composant prend sa forme "Aimé"
       et un clic sur le bouton déclenche la fonction pour ne plus aimer.
    3) Vérifier que lorsque l'on est connecté et ayant non liké, le composant prend sa forme
       "Non Aimé" et un clic sur le bouton déclenche la fonction pour aimer.

    P.S: Effectuer un snapshot du composant pour chaque test portant sur ses props.

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    color: '#fff',
  },
  likes: {
    position: 'relative',
    top: 3,
    left: -7,
    zIndex: 1,
  },
});

const LikeButton = (props) => {
  const {
    connected, liked, likes,
    askSignIn, onLike, onDislike,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });
  const like = connected && liked;
  const onLikeAction = liked ? onDislike : onLike;

  return (
    <span className={classes.root}>
      <IconButton onClick={connected ? onLikeAction : askSignIn} aria-label="Like">
        {like ? <FavoriteIcon color="secondary" /> : <FavoriteIcon style={{ color: '#fff' }} />}
      </IconButton>
      <Typography className={classes.likes} variant="subtitle1" component="span" color="inherited">
        {likes}
      </Typography>
    </span>
  );
};

LikeButton.propTypes = {
  /* A mettre à true si l'utilisateur courant est connecté et sinon false. */
  connected: PropTypes.bool,
  /* Etat du bouton like. "Aimé" => true, "Non aimé" => false */
  liked: PropTypes.bool,
  /* Nombre de personnes ayant liké l'établissement. */
  likes: PropTypes.number.isRequired,
  /* Fonction réquérant la connexion de l'utilisateur. */
  askSignIn: PropTypes.func,
  /* Fonction déclenchée lors du clic sur le bouton en état "Aimé". */
  onLike: PropTypes.func,
  /* Fonction déclenchée lors du clic sur le bouton en état "Non aimé". */
  onDislike: PropTypes.func,
};

LikeButton.defaultProps = {
  connected: false,
  liked: false,
  askSignIn: () => console.log('Vous devez vous connecter pour réaliser cette action.'),
  onLike: () => console.log('Vous venez daimer cet établissment'),
  onDislike: () => console.log('Vous naimez plus cet établissment'),
};

export default LikeButton;
