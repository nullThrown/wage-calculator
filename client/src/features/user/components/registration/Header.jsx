import { Box, Text } from '@chakra-ui/react';
import MainHeading from 'components/typography/MainHeading';

const Header = () => {
  return (
    <Box as='header' height='fit-content'>
      <MainHeading textAlign='center'>Add Company</MainHeading>
      <Text mt='15px' textAlign='center'>
        Add a company to your profile to begin creating earning's reports
        towards.
      </Text>
      <Text mt='15px' textAlign='center'>
        If you hold more than one position at a company, we suggest that you
        separate them into their own 'company' if you would like compare data
        between the two.
      </Text>
    </Box>
  );
};

export default Header;
