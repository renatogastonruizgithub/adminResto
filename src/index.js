import * as React from 'react';
import './index.css';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/Layout';

import Dashboard from './pages/Dashboard';
import Contact from './pages/categorias/ListCategorias';
import Products from './pages/productos/Products';
import UpdateProducts from './pages/productos/UpdateProducts';
import Tablets from './pages/mesas/Tablets';
import CreateOrder from './pages/ordenes/CreateOrder';
import NotAvailable from './pages/mesas/NotAvailable'; 
import Ticket from './pages/ordenes/Ticket';
import Orders from './pages/ordenes/Orders'

import ListCategorias from './pages/categorias/ListCategorias';
import UpdateCategorias from './pages/categorias/UpdateCategorias';



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
          {
            path: '/mesas',   
            Component: Tablets,
          },
          {
            path: '/crearOrden/:id',   
            Component: CreateOrder,
          },
          {
            path: '/llevar',   
            Component: CreateOrder,
          },
          {
            path: '/cuenta',   
            Component: NotAvailable,
          },
          {
            path: '/ticket/:id',   
            Component: Ticket,
          },
          {
            path: '/ordenes/historial',   
            Component: Orders,
          },
          {
            path: '/categorias/ver',   
            Component: ListCategorias,
          },
          {
            path: '/categorias/personalizar/:id',   
            Component: UpdateCategorias,
          },
          {
            path: '/categorias/personalizar',   
            Component: UpdateCategorias,
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
