import { Box, Text, HStack } from '@chakra-ui/react';
import SecHeading from 'components/typography/SecHeading';
const Header = ({ date, children }) => {
  const monthName = date.toLocaleString('default', { month: 'short' });
  const fullYear = date.getFullYear();
  return (
    <Box as='header' mb='2em'>
      <HStack spacing='12px'>
        <SecHeading as='h3'>
          {monthName} {fullYear}
        </SecHeading>
        {children}
      </HStack>
      <Text opacity='.85' mt='.4em'>
        Select a date and all your shifts for that week will be displayed below.
      </Text>
    </Box>
  );
};

export default Header;
