import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from 'pages/public/NotFound';
import protectedRoutes from './protected';
import publicRoutes from './public';
import useAuth from 'features/auth/hooks/useAuth';
// const protectedRoutes = lazy(() => import('./protected'));
// const publicRoutes = lazy(() => import('./public'));

const AppRoutes = () => {
  const errorRoute = { path: '/*', element: <NotFound /> };

  const isAuth = useAuth();
  const routes = isAuth ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, errorRoute]);

  return <>{element}</>;
};

export default AppRoutes;
