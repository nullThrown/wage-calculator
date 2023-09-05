import { Text } from '@chakra-ui/react';
const EntriesCountText = ({ count }) => {
  const verb = count === 1 ? 'is' : 'are';
  const noun = count === 1 ? 'entry' : 'entries';

  const Count = ({ count }) => (
    <Text color='purple.500' fontWeight='500' display='inline'>
      {count}
    </Text>
  );
  return (
    <Text mt='.5em' textAlign='center'>
      There {verb} <Count count={count} /> {noun} on that day
    </Text>
  );
};

export default EntriesCountText;
