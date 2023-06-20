import { Button } from '@chakra-ui/react';

const EditEntryBtn = ({ onOpen }) => {
  return (
    <Button
      colorScheme='blackAlpha'
      fontWeight='500'
      variant='solid'
      onClick={onOpen}>
      Edit Entry
    </Button>
  );
};
export default EditEntryBtn;
