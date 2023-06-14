import { Link, Link as RouterLink } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
const Signup = () => {
  return (
    <Link as='RouterLink' to='/signup'>
      Signup
    </Link>
  );
};

export default Signup;
