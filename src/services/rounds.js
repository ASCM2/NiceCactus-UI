import axios from 'axios';


const BASE_URL = 'http://localhost:3001';

export const play = async (newMoves) => {
  const data = await axios({
    method: 'post',
    url: `${BASE_URL}/play`,
    data: { moves: newMoves },
  }).then((res) => res.data);
  const { winner, position, moves } = data;

  return { winner, position, moves };
};

export const last = async () => {
  const data = await axios({ method: 'get', url: `${BASE_URL}/last`, })
    .then((res) => res.data);
  const { winner, position, moves } = data;

  return { winner, position, moves };
};

export const next = async () => {
  const data = await axios({ method: 'get', url: `${BASE_URL}/next`, })
    .then((res) => res.data);
  const { winner, position, moves } = data;

  return { winner, position, moves };
};

export const clear = async () => {
  const data = await axios({ method: 'delete', url: `${BASE_URL}/clear`, })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  const { winner, position, moves } = data;

  console.log('data: ');
  console.log(data);

  return { winner, position, moves };
};

export default null;
