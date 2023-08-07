import React from 'react';
import { Container } from '@chakra-ui/react';
const FormContainer = ({ children }) => {
  return (
    <Container m='5rem auto 8rem' maxW='45rem'>
      {children}
    </Container>
  );
};
export default FormContainer;
