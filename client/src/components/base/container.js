import { Flex } from '@chakra-ui/react';

const Container = ({ children }) => {
  return (
    <Flex
      as='main'
      direction='column'
      align='center'
      maxW='1000px'
      m='1em auto'>
      {children}
    </Flex>
  );
};

export default Container;
