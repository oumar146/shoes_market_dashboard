import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: 'clients',
    title: 'Clients',
    icon: <AssignmentIndIcon  />,
  },
  {
    kind: "divider",
  },
  {
    segment: 'categories',
    title: 'Catégories',
    icon: <ShoppingCartIcon />,
  },
  { kind: "divider" },
  {
    title: "Liste des produits",
    segment: "products/info",
    icon: <ViewInArIcon  />,
  },
  { kind: "divider" },
  {
    title: "Gestion du stock",
    segment: "products/stock",
    icon: <DescriptionIcon  />,
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
