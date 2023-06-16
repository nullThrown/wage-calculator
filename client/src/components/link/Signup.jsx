import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Signup = () => {
  return (
    <Link as={RouterLink} to='/signup'>
      Signup
    </Link>
  );
};

export default Signup;
