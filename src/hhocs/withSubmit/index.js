import { connect } from 'react-redux';

import withSubmit from './with-submit';


export default (asyncActionMethodProvider, options) => Component => connect(null, null)(
  withSubmit(asyncActionMethodProvider, options)(Component),
);
