import MainWrapper from 'components/base/MainWrapper';
import { Heading } from '@chakra-ui/react';
import Footer from 'components/base/Footer';

const NotFound = () => {
  return (
    <MainWrapper>
      <Heading as='h1' fontSize='2xl' fontWeight='500' m='2em 0 0 2em'>
        Oops :( looks like that page doesn't exist
      </Heading>
      <Footer />
    </MainWrapper>
  );
};

export default NotFound;
