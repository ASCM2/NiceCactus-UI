import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
/* Composant Material permettant d'afficher un bouton à l'écran */
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

/*
  Composant représentant une carte représentant un joueur qui peut être un
  joueur humain ou un ordinateur à afficher à l'écran.
 */
import PlayerCard from './player-card';
/*
  Les différents coups possibles d'un joueur.
  Cette variable n'est utilisée que dans les propTypes pour
  indiquer quels sont les coups acceptés par ce composant.
*/
import possibleMoves from './possible-moves';


const useStyles = makeStyles({
  root: {},
  game: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 50px',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 25,
  },
});

const computer1Label = 'Computer 1';
const computer2Label = 'Computer 2';
const playLabel = 'New round !';
const lastLabel = 'Last move';
const nextLabel = 'Next move';
const ComputerVsComputer = (props) => {
  const {
    winner,
    moves: [left, right],
    showLastButton,
    showNextButton,
    play,
    last,
    next,
    ...rest
  } = props;
  const classes = useStyles({ ...rest });

  return (
    <div className={classes.root}>
      <div className={classes.game}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PlayerCard label={left ? `${left} !` : left} role="computer" />
          <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h4">
            {computer1Label}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PlayerCard label={right ? `${right} !` : right} role="computer" />
          <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h4">
            {computer2Label}
          </Typography>
        </div>
      </div>
      <div style={{ marginTop: 25, display: 'flex', justifyContent: 'center' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={play}
        >
          {playLabel}
        </Button>
      </div>
      <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h5">
        {winner === 'left' && `Cumputer 1 wins !`}
        {winner === 'right' && `Computer 2 wins !`}
        {winner === 'none' && `No one wins.`}
      </Typography>
      <div className={classes.navigation}>
        <div>
          {showLastButton && (
            <Button
              color="primary"
              variant="outlined"
              onClick={last}
            >
              {lastLabel}
            </Button>
          )}
        </div>
        <div>
          {showNextButton && (
            <Button
              color="primary"
              variant="outlined"
              onClick={next}
            >
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

ComputerVsComputer.propTypes = {
  winner: PropTypes.oneOf(['left', 'right', 'none']),
  moves: PropTypes.arrayOf(PropTypes.oneOf(possibleMoves).isRequired),
  showLastButton: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  last: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

ComputerVsComputer.defaultProps = {
  winner: 'none',
  moves: [],
};

export default ComputerVsComputer;
