import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Login = () => {
  return (
    <Link
      as={RouterLink}
      to='/login'
      color='purple.600'
      padding='2px 10px'
      backgroundColor='white'
      _hover={{
        textDecoration: 'none',
        backgroundColor: 'purple.50',
      }}>
      Login
    </Link>
  );
};

export default Login;
