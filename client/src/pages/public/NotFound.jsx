import { Heading } from '@chakra-ui/react';
import TwoColumnLayout from 'components/layout.jsx/TwoColumnLayout';

const NotFound = () => {
  return (
    <TwoColumnLayout>
      <Heading as='h1' fontSize='2xl' fontWeight='500'>
        Oops :( looks like that page doesn't exist
      </Heading>
    </TwoColumnLayout>
  );
};

export default NotFound;
