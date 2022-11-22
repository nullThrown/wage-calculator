import Landing from 'pages/public/Landing';
import Login from 'pages/public/Login';
import Signup from 'pages/public/Signup';
import Test from 'pages/public/Test';
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
  {
    path: '/test',
    element: <Test />,
  },
];

export default publicRoutes;
