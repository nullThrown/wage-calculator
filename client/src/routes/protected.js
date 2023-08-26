import Home from 'pages/protected/Home';
import Account from 'pages/protected/Account';
import AddCompany from 'pages/protected/AddCompany';
import SignupSuccess from 'pages/protected/SignupSuccess';

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
    path: '/add-company',
    element: <AddCompany />,
  },
  {
    path: '/signup-success',
    element: <SignupSuccess />,
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
