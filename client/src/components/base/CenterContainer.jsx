import { Container, Flex } from '@chakra-ui/react';
import React from 'react';

const CenterContainer = ({ children }) => {
  return (
    <Flex
      min-height='100vh'
      width='100%'
      flexDirection='column'
      justify='center'
      alignItems='center'>
      {children}
    </Flex>
  );
};

export default CenterContainer;
