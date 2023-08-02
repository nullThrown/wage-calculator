import { Container } from '@chakra-ui/react';

const TestContainer = ({ children }) => {
  return (
    <Container as='main' maxW='1000px' w='98%' centerContent>
      {children}
    </Container>
  );
};

export default TestContainer;
