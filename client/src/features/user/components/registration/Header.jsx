import { Box, Text, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box as='header' height='fit-content'>
      <Heading as='h1' textAlign='center' fontSize='2xl' fontWeight='500'>
        Add Company
      </Heading>
      <Text mt='1.5em' textAlign='left' fontSize='sm'>
        Add a company to your profile to begin creating earning's reports
        towards.
      </Text>
      <Text mt='1.5em' textAlign='left' fontSize='sm'>
        If you hold more than one position at a company, we suggest that you
        separate them into their own 'company' if you would like compare data
        between the two.
      </Text>
    </Box>
  );
};

export default Header;
