import Home from './pages/Home';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Utilisation de Navigate pour redirections
import './styles/global.css'


const Router = () => {

  // Définir les routes
const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
];

  return (
    <HashRouter>
      <Routes>
          {/* Routes protégées */}
          {routes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={element}
            />
          ))}
        
        {/* Ajouter une route 404 par défaut si aucune correspondance n'est trouvée */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
