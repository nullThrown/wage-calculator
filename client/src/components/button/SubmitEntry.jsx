import React from 'react';
import { Button } from '@chakra-ui/react';
const SubmitEntry = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      colorScheme='green'
      m='2.6em auto 1em'
      display='block'>
      Submit Entry
    </Button>
  );
};
export default SubmitEntry;
