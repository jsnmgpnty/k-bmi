import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import BmiForm from './Components/BmiForm';
import Navbar from './Components/Navbar';
import theme from './Theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <BmiForm />
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
);

export default App;
