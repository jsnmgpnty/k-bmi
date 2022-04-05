import { createTheme } from '@mui/material/styles';
import { yellow, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});

export default theme;
