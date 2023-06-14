import { Button } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
const AddEntryBtn = ({ onToggle }) => {
  return (
    <Button
      onClick={onToggle}
      colorScheme='blue'
      variant='outline'
      type='button'
      mt='2em'
      rightIcon={<ArrowDownIcon />}>
      Add Entry
    </Button>
  );
};

export default AddEntryBtn;
