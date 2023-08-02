import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Signup = () => {
  return (
    <Link
      as={RouterLink}
      to='/signup'
      color='blackAlpha.800'
      // blue.600
      border='1px solid rgba(0, 0, 0, 0.80)'
      padding='2px 12px'
      borderRadius='14px'
      backgroundColor='white'
      _hover={{
        textDecoration: 'none',
        color: 'blackAlpha.600',
        borderColor: 'blackAlpha.600',
      }}>
      Signup
    </Link>
  );
};

export default Signup;
