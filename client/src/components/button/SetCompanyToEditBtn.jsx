import { Button } from '@chakra-ui/react';
const SetCompanyToEditBtn = ({ handleSetEditMode }) => {
  return (
    <Button size='xs' variant='link' onClick={handleSetEditMode}>
      Edit
    </Button>
  );
};

export default SetCompanyToEditBtn;
