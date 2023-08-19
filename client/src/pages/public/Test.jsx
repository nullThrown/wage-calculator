import TestContainer from 'components/base/TestContainer';
import { Box, Text } from '@chakra-ui/react';
import LineGraph from 'components/data/LineGraph';
const Test = () => {
  return (
    <TestContainer>
      <Text>Hello there</Text>
      <Box height='24rem' width='36rem'>
        <LineGraph
          data={[{ id: 'no-data', data: [{ x: 'no-data', y: 40 }] }]}
        />
      </Box>
    </TestContainer>
  );
};

export default Test;
