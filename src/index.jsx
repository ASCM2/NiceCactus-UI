/*
  Comentaire addressé au linter pour lui faire
  reconnaître docmuent comme une variable globale.
*/
/* global document: false */
import React from 'react';
import ReactDOM from 'react-dom';
/*
  La police Roboto est utilisée par défaut sur tous
  les textes du site.
*/
import 'typeface-roboto';

import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
