import { Box, Button, HStack, Text, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';
import CenterContainer from 'components/base/CenterContainer';
import SmallCard from 'components/card/SmallCard';
import MainHeading from 'components/typography/MainHeading';

const SignupSuccess = () => {
  return (
    <CenterContainer>
      <SmallCard>
        <HStack justifyContent='center'>
          <MainHeading>Sign Up Success</MainHeading>
          <CheckIcon w={10} h={10} color='green.600'></CheckIcon>
        </HStack>
        <Box>
          <Text fontSize='xl' textAlign='center' m='30px 0 5px'>
            Click the button below to continue creating your profile.
          </Text>
          <Flex justifyContent='center'></Flex>
          <Link
            as={RouterLink}
            to='/create-profile'
            display='block'
            textAlign='center'
            backgroundColor='green.500'
            color='white'
            p='8px'
            borderRadius='8px'
            w='max-content'
            m='30px auto 30px'>
            Create Profile
          </Link>
        </Box>
      </SmallCard>
    </CenterContainer>
  );
};

export default SignupSuccess;
