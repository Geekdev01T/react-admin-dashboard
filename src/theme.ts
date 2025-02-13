import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // green
    },
    secondary: {
      main: '#ff5722', // orange
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9', // light blue
    },
    secondary: {
      main: '#f48fb1', // pink
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export { lightTheme, darkTheme };