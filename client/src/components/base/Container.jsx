import { Container } from '@chakra-ui/react';

const MainContainer = ({ children }) => {
  return (
    <Container as='main' centerContent maxW='1000px' w='98%' m='1em auto'>
      {children}
    </Container>
  );
};

export default MainContainer;
