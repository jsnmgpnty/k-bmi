import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Box
        component={Toolbar}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="h6" component="div">
          BMI Calculator
        </Typography>
      </Box>
    </AppBar>
  </Box>
);

export default Navbar;
