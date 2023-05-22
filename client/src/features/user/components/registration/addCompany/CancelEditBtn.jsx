import { Button } from '@chakra-ui/react';

const CancelEditBtn = ({ handleCancelEditMode }) => {
  return (
    <Button type='button' colorScheme='red' onClick={handleCancelEditMode}>
      Cancel
    </Button>
  );
};

export default CancelEditBtn;
