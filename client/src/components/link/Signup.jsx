import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Signup = () => {
  return (
    <Link
      as={RouterLink}
      to='/signup'
      color='whiteAlpha.900'
      fontWeight='500'
      // blue.600
      padding='2px 12px'
      backgroundColor='purple.300'
      borderRadius='2px'
      _hover={{
        textDecoration: 'none',
        backgroundColor: 'purple.200',
      }}>
      Signup
    </Link>
  );
};

export default Signup;
