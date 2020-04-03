/* Tests (début)

    1) Vérifier que ce composant prend bien en compte la liste de
       toutes les fonctions clientes actuellement disponibles.
    2) Vérifier que lors du clic sur le bouton, la fonction de clic est bien appelée.

    P.S: Effectuer un snapshot du composant pour chaque test portant sur ses props.

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {},
});

const MainFunctionButton = (props) => {
  const {
    connected, mainFunction,
    askSignIn, onClick, ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      onClick={connected ? onClick : askSignIn}
    >
      {mainFunction}
    </Button>
  );
};

MainFunctionButton.propTypes = {
  /* A mettre à true si l'utilisateur courant est connecté et sinon false. */
  connected: PropTypes.bool,
  /* Fonction réquérant la connexion de l'utilisateur. */
  askSignIn: PropTypes.func,
  /* Principale fonction cliente à activer. */
  mainFunction: PropTypes.oneOf(['Réserver']).isRequired,
  /* Fonction appelée lors du clic sur le bouton. */
  onClick: PropTypes.func,
};

MainFunctionButton.defaultProps = {
  connected: false,
  askSignIn: () => console.log('Vous devez vous connecter pour réaliser cette action.'),
  onClick: () => console.log('Activation de la fonction principale pour cet établissemnt.'),
};

export default MainFunctionButton;
