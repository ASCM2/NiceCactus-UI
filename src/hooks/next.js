import { useState, useEffect } from 'react';

import { next } from '../services/rounds';


const useNext = () => {
  const [winner, setWinner] = useState('none');
  const [moves, setMoves] = useState([]);
  const [position, setPosition] = useState(-1);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);

  const onNext = () => {
    next()
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

  return { winner, moves, position, called, error, next: onNext, reinit };
};

export default useNext;
