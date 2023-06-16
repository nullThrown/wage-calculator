import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <Link as={RouterLink} to='/login'>
      Login
    </Link>
  );
};

export default Login;
