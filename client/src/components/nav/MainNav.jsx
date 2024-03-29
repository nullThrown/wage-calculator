import { Box, Divider, Link, ListItem, OrderedList } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const MainNav = () => {
  const { pathname } = useLocation();

  const determineHoverStyle = (pathname, linkTo) => {
    return pathname === linkTo
      ? {
          backgroundColor: 'rgb(252,252,252)',
        }
      : { backgroundColor: 'purple.50' };
  };
  const determineColor = (pathname, linkTo) => {
    return pathname === linkTo ? 'gray.400' : 'purple.500';
  };

  return (
    <Box as='nav' w='80%' m='2em auto 4em'>
      <OrderedList display='flex' mb='.4em' listStyleType='none'>
        <ListItem mr='1em'>
          <Link
            as={RouterLink}
            to='/home'
            p='.4em .5em'
            _hover={determineHoverStyle(pathname, '/home')}
            color={determineColor(pathname, '/home')}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link
            as={RouterLink}
            to='/account'
            p='.4em .5em'
            _hover={determineHoverStyle(pathname, '/account')}
            color={determineColor(pathname, '/account')}>
            Account
          </Link>
        </ListItem>
      </OrderedList>
      <Divider />
    </Box>
  );
};

export default MainNav;
