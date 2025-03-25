import * as React from 'react';
import './index.css';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/Layout';

import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Products from './pages/productos/Products';
import UpdateProducts from './pages/productos/UpdateProducts';



const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: Dashboard,
          },
          {
            path: '/contact',
            Component: Contact,
          },
          {
            path: '/productos/personalizar',
            Component: Products,
          },
          {
            path: '/productos/personalizar/update/:id',
            Component: UpdateProducts,
          },
          {
            path: '/productos/Crear',
            Component: UpdateProducts,
          },
        ],
      },
    ],
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
