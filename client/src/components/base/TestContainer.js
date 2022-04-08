import { Container } from '@chakra-ui/react';

const TestContainer = ({ children }) => {
  return (
    <Container as='main' maxW='1000px' w='98%' centerContent m='8em auto 0'>
      {children}
    </Container>
  );
};

export default TestContainer;
