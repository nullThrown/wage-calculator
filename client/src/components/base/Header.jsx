import { Box, HStack } from '@chakra-ui/react';
import QuatHeading from 'components/typography/QuatHeading';
import Login from 'components/link/Login';
import Signup from 'components/link/Signup';
const Header = () => {
  return (
    <Box
      as='header'
      maxW='1000px'
      w='98%'
      m='0 auto'
      h='3em'
      display='flex'
      alignItems='flex-end'
      paddingBottom='.4em'
      justifyContent='space-between'
      borderBottom='1px solid rgba(44, 105, 185, .8)'>
      <QuatHeading as='h1'>Tip Analytics</QuatHeading>
      <HStack>
        <Login />
        <Signup />
      </HStack>
    </Box>
  );
};

export default Header;
