import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
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
});

export default theme;
