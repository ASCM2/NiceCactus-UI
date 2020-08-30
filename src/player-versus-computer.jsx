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

const playerLabel = 'Player';
const computerLabel = 'Computer';
const lastLabel = 'Last move';
const nextLabel = 'Next move';
const PlayerVsComputer = (props) => {
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
          <PlayerCard label={left ? `${left} !` : left} role="player" onClick={play} />
          <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h4">
            {playerLabel}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PlayerCard label={right ? `${right} !` : right} role="computer" hideButton />
          <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h4">
            {computerLabel}
          </Typography>
        </div>
      </div>
      <Typography style={{ marginTop: 25 }} align="center" component="div" variant="h5">
        {winner === 'left' && `You win !`}
        {winner === 'right' && `The computer wins !`}
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

PlayerVsComputer.propTypes = {
  winner: PropTypes.oneOf(['left', 'right', 'none']),
  moves: PropTypes.arrayOf(PropTypes.oneOf(possibleMoves).isRequired),
  showLastButton: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  last: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

PlayerVsComputer.defaultProps = {
  winner: 'none',
  moves: [],
};

export default PlayerVsComputer;
