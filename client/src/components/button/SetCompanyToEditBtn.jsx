import { Button } from '@chakra-ui/react';
const SetCompanyToEditBtn = ({ handleSetEditMode }) => {
  return (
    <Button ml='2em' size='xs' variant='link' onClick={handleSetEditMode}>
      Edit
    </Button>
  );
};

export default SetCompanyToEditBtn;
