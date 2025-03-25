import React from 'react';

import { Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';
import NAVIGATION from './menu-items';
import { Container } from '@mui/material';

export default function App() {
  return (
    <AppProvider  
   
      navigation={NAVIGATION}
       branding={{
      /*   logo: <img src="https://codingmstr.com/img/logo-white.png" alt="MUI logo" />, */
        title: 'Resto admin',
      }} 
    >
      
      
        <Outlet />
     
    </AppProvider>
  );
}