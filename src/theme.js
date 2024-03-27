import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: "rgba(0, 0, 0, 0.5)",
    },
    primary: {
      main: '#0466c8',
    },
    secondary: {
      main: '#f0f0f0',
    },
    tertiary: {
      main: "#4804C8"
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif',
    ].join(','),
  }
});

export default theme;
