import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../Images/logo-white.png';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Box
        component={Toolbar}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box component="img" src={logo} height={50} />
      </Box>
    </AppBar>
  </Box>
);

export default Navbar;
