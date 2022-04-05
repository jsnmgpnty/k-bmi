import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
  typography: {
    color: '#333',
  },
  palette: {
    primary: {
      main: '#6dbdd6',
    },
    secondary: {
      main: '##26C485',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          color: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
        },
      },
    },
    MuiSnackbar: {
      root: {
        borderRadius: 20,
      },
    },
  },
});

export default theme;
