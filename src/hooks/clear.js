import { useState, useEffect } from 'react';

import { clear } from '../services/rounds';


const useClear = () => {
  const [winner, setWinner] = useState('none');
  const [moves, setMoves] = useState([]);
  const [position, setPosition] = useState(-1);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(null);

  const onClear = () => {
    console.log('i am called');
    clear()
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

  useEffect(() => {
    setCalled(false);
  }, [called]);

  return { winner, moves, position, called, error, clear: onClear };
};

export default useClear;
