import { Button } from '@chakra-ui/react';

const EditEntryBtn = ({ onClick }) => {
  return (
    <Button
      colorScheme='blackAlpha'
      fontWeight='500'
      variant='solid'
      onClick={onClick}>
      Edit Entry
    </Button>
  );
};
export default EditEntryBtn;
