import Home from 'pages/protected/Home';
import Account from 'pages/protected/Account';
const protectedRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/account',
    element: <Account />,
  },
];

export default protectedRoutes;
