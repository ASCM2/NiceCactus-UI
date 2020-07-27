/* Tests (début)

    1) Vérifier que la prop mediaError est par défaut à false.

    2) Vérifier que si la prop mediaError est à true, le composant indiqué
       par la prop error est rendu en lieu et place du composant actuel.

    3) Vérifier que la prop mediaLoading est par défaut à true.

    4) Vérifier que si la prop mediaLoading est à true, tout se déroule bien en effectuant
       un snapshot (le composant indiqué par la prop loading est bien chargé et mis en front).

    5) Vérifier que si la prop mediaLoading est à false, tout se déroule bien en effectuant
       un snapshot (le composant nominal est chargé de manière régulière)

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  component: {
    opacity: ({ mediaLoading }) => (mediaLoading ? 0 : 1),
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const WithImage = (props) => {
  const classes = useStyles(props);
  const {
    mediaLoading, mediaError, component,
    loading, error,
  } = props;

  if (mediaError) return error;
  return (
    <div className={classes.root}>
      <div className={classes.component}>
        {component}
      </div>
      {mediaLoading && (
        <div className={classes.placeholder}>
          {loading}
        </div>
      )}
    </div>
  );
};

WithImage.propTypes = {
  /* Indique si le média inclut dans le composant indiqué
     par la prop component est en cours de chargement.
  */
  mediaLoading: PropTypes.bool,
  /* Indique si le média inclut dans le composant indiqué
     par la prop component a rencontré une erreur lors de
     son chargement.
  */
  mediaError: PropTypes.bool,
  /* Composant contenant le média dont les différents états
     de ce média (en chargement, en erreur, en fonctionnement
     nominal) définiront la manière dont ce composant sera rendu.
  */
  component: PropTypes.node.isRequired,
  /* Composant rendu si la prop mediaError est à true */
  error: PropTypes.node,
  /* Composant rendu si la prop mediaLoading est à true */
  loading: PropTypes.node.isRequired,
};

WithImage.defaultProps = {
  /* Par défaut, on considère que le média interne au composant
     se charge.
  */
  mediaLoading: true,
  /* Par défaut, on considère que le média interne au composant
     n'a pas rencontré d'erreur lors de son chargement.
  */
  mediaError: false,
  error: null,
};


export default WithImage;
