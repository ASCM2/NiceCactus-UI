/* Tests (début)

    1) Vérifier qu'à chaque fois que le chip est cliqué, la fonction onClick est
       appelée avec en paramètre le nouvel état (actif ou inactif) du chip.

    P.S: Effectuer un snapshot du composant à chaque fois qu'un test portant
    sur les props du composant est effectué.

   Tests (fin) */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { makeStyles, fade } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';


const borderColor = (active) => (active ? fade(blue[500], 0.5) : blue[500]);
const useStyles = makeStyles({
  outlined: {
    color: blue[300],
    padding: ({ active }) => (active ? '9px 1px' : '10px 2px'),
    border: ({ active }) => `${active ? 2 : 1}px solid ${borderColor(active)}`,
    '$clickable&:hover': {
      border: `2px solid ${borderColor(true)}`,
      padding: '9px 1px',
      backgroundColor: 'transparent',
    },
    '$clickable&:focus': {
      border: ({ active }) => `2px solid ${borderColor(active)}`,
      padding: ({ active }) => (active ? '9px 1px' : '10px 2px'),
      backgroundColor: 'transparent',
    },
    boxSizing: 'border-box',
  },
  clickable: {
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      boxShadow: 'unset',
    },
    boxSizing: 'border-box',
  },
  label: {
    display: 'flex',
  },
  text: {
    textTransform: 'capitalize',
  },
});

const BusinessChip = (props) => {
  const {
    active, icon, label, onClick, ...rest
  } = props;
  const classes = useStyles({ active, ...rest });

  return (
    <Chip
      classes={{ clickable: classes.clickable, outlined: classes.outlined }}
      variant="outlined"
      label={(
        <div className={classes.label}>
          {icon}
          <Typography
            className={classes.text}
            style={{ marginLeft: 5 }}
            variant="body1"
            color="inherit"
          >
            {label}
          </Typography>
        </div>
      )}
      onClick={() => onClick(!active)}
    />
  );
};

BusinessChip.propTypes = {
  active: PropTypes.bool,
  /*
    Icône Material du Chip.
  */
  icon: PropTypes.node.isRequired,
  /*
    Texte du Chip.
  */
  label: PropTypes.string.isRequired,
  /*
    Fonction appelée à chaque fois que l'utilisateur clique sur le chip.
    Elle est appelée avec l'état (actif ou inactif) du Chip en paramètre.
  */
  onClick: PropTypes.func.isRequired,
};

BusinessChip.defaultProps = {
  active: false,
};

export default BusinessChip;
