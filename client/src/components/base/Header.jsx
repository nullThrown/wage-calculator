import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react';
import Login from 'components/link/Login';
import Signup from 'components/link/Signup';
import useGetUser from 'features/user/hooks/useGetUser';
import useSignoutUser from 'features/auth/hooks/useSignoutUser';

const Header = () => {
  const { user, isLoading, isError } = useGetUser();
  const { signout } = useSignoutUser();
  return (
    <Box
      as='header'
      w='100%'
      h='4em'
      top='0'
      padding='0 1em'
      // color chakra: blue.100
      borderBottom='1px solid'
      borderBottomColor='purple.300'
      paddingBottom='.4em'>
      <Box
        height='100%'
        maxW='64rem'
        display='flex'
        m='0 auto'
        alignItems='flex-end'
        justifyContent='space-between'>
        <Heading display='inline' as='h1' fontSize='2xl' color='blackAlpha.700'>
          Tip Analytics
        </Heading>
        <HStack>
          {user ? (
            <>
              <Text color='purple.300' opacity='.65' fontWeight='400'>
                hello
              </Text>
              <Text color='purple.600' fontWeight='500' mr='1.5em'>
                {user.username}
              </Text>
              <Button
                onClick={signout}
                variant='outline'
                borderColor='purple.200'
                size='sm'
                color='purple.500'>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Login />
              <Signup />
            </>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
