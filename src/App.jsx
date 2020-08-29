import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';

import PlayerVsComputer from './player-versus-computer';
import ComputerVsComputer from './computer-versus-computer';
import usePlay from './hooks/play';
import useLast from './hooks/last';
import useNext from './hooks/next';
import useClear from './hooks/clear';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 90,
  },
  body: {
    marginTop: 50,
  },
  modes: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 25,
  },
  criteria: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
}));


const welcomeTitle = 'Welcome to the Rock Paper Scissor Tournament !';
let winner = 'none';
let moves = [];
let position = (-1);

const App = (props) => {
  const [mode, setMode] = useState('player-versus-computer');
  const classes = useStyles(props);
  const {
    winner: playWinner,
    moves: playMoves,
    position: playPosition,
    called: playCalled,
    play,
    reinit: playReinit,
  } = usePlay();
  const {
    winner: lastWinner,
    moves: lastMoves,
    position: lastPosition,
    called: lastCalled,
    last,
    reinit: lastReinit,
  } = useLast();
  const {
    winner: nextWinner,
    moves: nextMoves,
    position: nextPosition,
    called: nextCalled,
    next,
    reinit: nextReinit,
  } = useNext();
  const {
    winner: clearWinner,
    moves: clearMoves,
    position: clearPosition,
    called: clearCalled,
    clear,
  } = useClear();

  const toggleMode = (newMode) => {
    if (newMode !== mode) {
      playReinit();
      lastReinit();
      nextReinit();
      clear();
    }
    setMode(newMode);
  };

  if (playCalled) {
    winner = playWinner;
    moves = playMoves;
    position = playPosition;
  }

  if (lastCalled) {
    winner = lastWinner;
    moves = lastMoves;
    position = lastPosition;
  }

  if (nextCalled) {
    winner = nextWinner;
    moves = nextMoves;
    position = nextPosition;
  }

  if (clearCalled) {
    winner = clearWinner;
    moves = clearMoves;
    position = clearPosition;
  }

  const showLastButton = Boolean(position > 0);
  const showNextButton = Boolean(position < playPosition);

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.modes}>
          <div className={classes.criteria}>
            <Checkbox
              checked={mode === 'player-versus-computer'}
              color="secondary"
              inputProps={{ 'aria-label': 'Player versus Computer' }}
              onChange={() => toggleMode('player-versus-computer')}
            />
            <Typography className={classes.label} variant="subtitle2" color="textSecondary">
              {`Player versus Computer`}
            </Typography>
          </div>
          <div className={classes.criteria}>
            <Checkbox
              checked={mode === 'computer-versus-computer'}
              color="secondary"
              inputProps={{ 'aria-label': 'Computer versus Computer' }}
              onChange={() => toggleMode('computer-versus-computer')}
            />
            <Typography className={classes.label} variant="subtitle2" color="textSecondary">
              {`Computer versus Computer`}
            </Typography>
          </div>
        </div>
        <div className={classes.game}>
          <Typography align="center" component="div" variant="h4">{welcomeTitle}</Typography>
          {mode === 'player-versus-computer' && (
            <PlayerVsComputer
              classes={{ root: classes.body }}
              winner={winner}
              moves={moves}
              showLastButton={showLastButton}
              showNextButton={showNextButton}
              play={() => play()}
              last={() => last()}
              next={() => next()}
            />
          )}
          {mode === 'computer-versus-computer' && (
            <ComputerVsComputer
              classes={{ root: classes.body }}
              winner={winner}
              moves={moves}
              showLastButton={showLastButton}
              showNextButton={showNextButton}
              play={() => play()}
              last={() => last()}
              next={() => next()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
