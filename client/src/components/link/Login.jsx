import { Link, Link as RouterLink } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <Link as='RouterLink' to='/login'>
      Login
    </Link>
  );
};

export default Login;
