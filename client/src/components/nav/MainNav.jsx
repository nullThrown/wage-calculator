import { Box, Divider, Link, ListItem, OrderedList } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const MainNav = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Box as='nav' w='80%' m='2em auto 4em'>
      <OrderedList display='flex' mb='.4em' listStyleType='none'>
        <ListItem mr='1em'>
          <Link
            as={RouterLink}
            to='/home'
            p='.4em .5em'
            _hover={
              pathname === '/home'
                ? { backgroundColor: 'rgb(252,252,252)' }
                : { backgroundColor: 'purple.50' }
            }
            color={pathname === '/home' ? 'gray.400' : 'purple.500'}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link
            as={RouterLink}
            to='/account'
            p='.4em .5em'
            _hover={
              pathname === '/account'
                ? { backgroundColor: 'rgb(250,250,250)' }
                : { backgroundColor: 'purple.50' }
            }
            color={pathname === '/account' ? 'gray.400' : 'purple.500'}>
            Account
          </Link>
        </ListItem>
      </OrderedList>
      <Divider />
    </Box>
  );
};

export default MainNav;
