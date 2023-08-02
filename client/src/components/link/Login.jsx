import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Login = () => {
  return (
    <Link
      as={RouterLink}
      to='/login'
      color='blue.600'
      // blue.600
      border='1px solid #2b6cb0'
      padding='2px 10px'
      borderRadius='14px'
      backgroundColor='white'
      _hover={{
        textDecoration: 'none',
        color: 'blue.900',
        borderColor: 'blue.900',
      }}>
      Login
    </Link>
  );
};

export default Login;
