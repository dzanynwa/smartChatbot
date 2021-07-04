import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#003f88',
      dark: '#00296b',
      light: '#00509d',
    },
    secondary: {
      main: '#ffd500',
      dark: '#fdc500',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

export default theme;