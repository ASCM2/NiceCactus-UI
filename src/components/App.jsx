/* global localStorage: false */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import Home from './Pages/home';


const client = new ApolloClient({
  uri: process.env.REACT_APP_BACK_END_URL,
});

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    background: {
      default: '#fff',
    },
  },
});

localStorage.user = JSON.stringify({ id: '517f1f78bcf86cd799439012', roles: ['user'], name: 'user' });

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={() => <h1>404 Not Found.</h1>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
