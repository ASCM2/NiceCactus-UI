import { useState, useEffect } from 'react';

import { play } from '../services/rounds';
import possibleMoves from '../possible-moves';


const usePlay = () => {
  const [winner, setWinner] = useState('none');
  const [moves, setMoves] = useState([]);
  const [position, setPosition] = useState(-1);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);

  const onPlay = () => {
    const left = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const right = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const newMoves = [left, right];

    play(newMoves)
      .then((result) => {
        setWinner(result.winner);
        setMoves(result.moves);
        setPosition(result.position);
        setCalled(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const reinit = () => {
    setWinner('none');
    setMoves([]);
    setPosition(-1);
    setCalled(false);
  };

  useEffect(() => {
    setCalled(false);
  }, [called]);

  return { winner, moves, position, called, error, play: onPlay, reinit };
};

export default usePlay;
