import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'clients',
    title: 'Clients',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'categories',
    title: 'Catégories',
    icon: <ShoppingCartIcon />,
  },
  { kind: "divider" },
  {
    segment: "products",
    title: "Produits",
    icon: <ShoppingCartIcon />,
    children: [
      { segment: "info", title: "Liste des produits", icon: <ShoppingCartIcon /> },
      { segment: "stock", title: "Gestion du stock", icon: <ShoppingCartIcon /> },
    ],
  },
];

const BRANDING = {
  title: 'ShoesMarket',
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
