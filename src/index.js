import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider , createBrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Layout from "./components/Layout.jsx";
import Clients from "./pages/sideMenu/Clients.jsx"; 
import Orders from "./pages/sideMenu/Orders.jsx";
import Catégories from "./pages/sideMenu/Categories.jsx";
import Products from "./pages/sideMenu/products/Products.jsx";
import Stock from "./pages/sideMenu/products/Stock.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: 'orders',
            Component:  Orders,
          },
          {
            path: 'clients',
            Component: Clients,
          },
          {
            path: 'categories',
            Component: Catégories,
          },
          {
            path: 'products/info',
            Component: Products,
          },          {
            path: 'products/stock',
            Component: Stock,
          },          
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
);
