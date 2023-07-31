import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import NotFound from 'pages/public/NotFound';
import protectedRoutes from './protected';
import publicRoutes from './public';
import useAuth from 'features/auth/hooks/useAuth';
import Test from 'pages/public/Test';
// const protectedRoutes = lazy(() => import('./protected'));
// const publicRoutes = lazy(() => import('./public'));

const AppRoutes = () => {
  const errorRoute = { path: '/*', element: <NotFound /> };
  const testRoute = { path: '/test', element: <Test /> };
  const isAuth = useAuth();
  const routes = isAuth ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, testRoute, errorRoute]);

  return <>{element}</>;
};

export default AppRoutes;
