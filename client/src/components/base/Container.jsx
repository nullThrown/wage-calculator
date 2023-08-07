import { Container } from '@chakra-ui/react';

const MainContainer = ({ children }) => {
  return (
    <Container as='main' centerContent maxW='80rem' w='98%' m='8rem auto 4rem'>
      {children}
    </Container>
  );
};

export default MainContainer;
