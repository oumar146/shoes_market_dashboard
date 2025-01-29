import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/sideMenu/Home";
import Orders from "./pages/sideMenu/Orders";
import Clients from "./pages/sideMenu/Clients";
import Products from "./pages/sideMenu/products/Products";
import Categories from "./pages/sideMenu/Categories";
import Stock from "./pages/sideMenu/products/Stock";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { AppProvider } from "@toolpad/core/AppProvider";
import BaseOfPages from "./components/BaseOfPages";
// import Reports from "./pages/Reports";
// import Sales from "./pages/Sales";
// import Traffic from "./pages/Traffic";

const Router = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/dashboard", element: <Home /> },
    { path: "/dashboard/orders", element: <Orders /> },
    { path: "/dashboard/clients", element: <Clients /> },
    { path: "/dashboard/categories", element: <Categories /> },
    { path: "/dashboard/products/info", element: <Products /> },
    { path: "/dashboard/products/stock", element: <Stock /> },
    { path: "#/", element: <Home /> },
    { path: "#/dashboard", element: <Home /> },
    { path: "#/dashboard/orders", element: <Orders /> },
    { path: "#/dashboard/clients", element: <Clients /> },
    { path: "#/dashboard/categories", element: <Categories /> },
    { path: "#/dashboard/products/info", element: <Products /> },
    { path: "#/dashboard/products/stock", element: <Stock /> },
  ];

  const NAVIGATION = [
    { kind: "header", title: "Main Items" },
    { segment: "/dashboard", title: "Dashboard", icon: <DashboardIcon /> },
    { kind: "divider" },
    {
      segment: "dashboard/orders",
      title: "Commandes",
      icon: <ShoppingCartIcon />,
    },
    { kind: "divider" },
    {
      segment: "/dashboard/clients",
      title: "Clients",
      icon: <AssignmentIndIcon />,
    },
    { kind: "divider" },
    {
      segment: "#/dashboard/categories",
      title: "Catégories",
      icon: <ShoppingCartIcon />,
    },
    { kind: "divider" },
    {
      segment: "/dashboard/products",
      title: "Produits",
      icon: <ViewInArIcon />,
      children: [
        {
          segment: "info",
          title: "Liste des produits",
          icon: <ViewInArIcon />,
        },
        {
          segment: "stock",
          title: "Gestion du stock",
          icon: <DescriptionIcon />,
        },
      ],
    },
  ];

  const dashboardTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: "class",
    breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
  });

  return (
    <HashRouter>
      <AppProvider
        navigation={NAVIGATION}
        theme={dashboardTheme}
        branding={{ logo: "", title: "ShoeMarket", homeUrl: "/dashboard" }}
      >
<BaseOfPages/>
      </AppProvider>
    </HashRouter>
  );
};

export default Router;
