import TestContainer from 'components/base/TestContainer';
import Header from 'components/base/Header';
import MainWrapper from 'components/base/MainWrapper';
import { Box } from '@chakra-ui/react';
import Footer from 'components/base/Footer';
import Landing from './Landing';
const Test = () => {
  return (
    <MainWrapper isHeader>
      <Header />
      <Box as='main'>this is some main content</Box>
      <Footer />
    </MainWrapper>
  );
};

export default Test;
