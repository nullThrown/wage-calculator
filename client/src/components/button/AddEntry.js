import { Button } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
const AddEntryBtn = () => {
  return (
    <Button
      colorScheme='blue'
      variant='outline'
      mt='2em'
      rightIcon={<ArrowDownIcon />}>
      Add Entry
    </Button>
  );
};

export default AddEntryBtn;
