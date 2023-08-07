import { Box, HStack, Heading } from '@chakra-ui/react';
import Login from 'components/link/Login';
import Signup from 'components/link/Signup';

const Header = () => {
  return (
    <Box
      as='header'
      w='100%'
      h='4em'
      display='flex'
      alignItems='flex-end'
      justifyContent='space-between'
      top='0'
      padding='0 1em'
      // color chakra: blue.100
      backgroundColor='#bee3f8'
      backgroundImage='url(/svg/bg-header.svg)'
      paddingBottom='.4em'>
      <Heading as='h1' fontSize='2xl' color='whiteAlpha.900'>
        Tip Analytics
      </Heading>
      <HStack>
        <Login />
        <Signup />
      </HStack>
    </Box>
  );
};

export default Header;
