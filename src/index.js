import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { RouterProvider , createBrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Layout from "./components/BaseOfPages";
import OrdersList from "./components/orders/OrdersList";
import Clients from "./pages/sideMenu/Clients.jsx"; 
import Orders from "./pages/sideMenu/Orders.jsx";
import Catégories from "./pages/sideMenu/Categories.jsx";

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
