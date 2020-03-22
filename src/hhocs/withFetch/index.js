import { connect } from 'react-redux';

import withFetch from './with-fetch';


export default asyncAction => Component => connect(null, null)(
  withFetch(asyncAction)(Component),
);
