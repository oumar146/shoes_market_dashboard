import { HashRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import Home from "./pages/sideMenu/Home";
import Orders from "./pages/sideMenu/Orders";
import Clients from "./pages/sideMenu/Clients"; 
import Products from "./pages/sideMenu/products/Products"; 
import Categories from "./pages/sideMenu/Categories"; 
import Stock from "./pages/sideMenu/products/Stock";
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
    // { path: "/dashboard/reports", element: <Reports /> },  
    // { path: "/dashboard/reports/sales", element: <Sales /> },  
    // { path: "/dashboard/reports/traffic", element: <Traffic /> },  
  ];
  

  return (
    <HashRouter>
      <NavigationProvider>
        <Routes>
            {routes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={element}
            />
          ))}

          {/* Route 404 */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </NavigationProvider>
    </HashRouter>
  );
};

export default Router;
