import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import Routes from './routes';
import theme from './theme/indes';

const App = () => {
  const history = createBrowserHistory();

  return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <Reset />
            <Router history={history}>
              <Routes />
              
            </Router>
          </StylesProvider>
        </ThemeProvider>
      </MuiThemeProvider>
  );
};

export default App;
