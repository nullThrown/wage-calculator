import Home from 'pages/protected/Home';
import Account from 'pages/protected/Account';
import SignupSuccess from 'pages/protected/SignupSuccess';
import ProfileCreation from 'pages/protected/ProfileCreation';
import { Navigate } from 'react-router-dom';
const protectedRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/signup-success',
    element: <SignupSuccess />,
  },
  {
    path: '/create-profile',
    element: <ProfileCreation />,
  },
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/login',
    element: <Navigate to='/home' />,
  },
  {
    path: '/signup',
    element: <Navigate to='/home' />,
  },
];

export default protectedRoutes;
