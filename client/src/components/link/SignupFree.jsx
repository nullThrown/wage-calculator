import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SignupFree = () => {
  return (
    <Link
      as={RouterLink}
      to='/signup'
      color='white'
      padding='4px 12px 6px'
      borderRadius='8px'
      backgroundColor='facebook.800'
      fontSize='sm'
      alignSelf='center'
      _hover={{
        textDecoration: 'none',
        backgroundColor: 'blue.900',
      }}>
      Signup For Free
    </Link>
  );
};

export default SignupFree;
