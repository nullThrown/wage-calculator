import TestContainer from 'components/base/TestContainer';
import { Box, Text } from '@chakra-ui/react';

const Test = () => {
  return (
    <TestContainer>
      <Text>Hello there</Text>
      <Box height='24rem' width='36rem'></Box>
    </TestContainer>
  );
};

export default Test;
