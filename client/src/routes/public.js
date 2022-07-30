import Landing from 'pages/public/Landing';
import Login from 'pages/public/Login';
import Signup from 'pages/public/Signup';
const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
];

export default publicRoutes;
