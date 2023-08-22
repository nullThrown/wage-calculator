import { Button } from '@chakra-ui/react';
const DeleteCompanyBtn = ({ isLoading, handleDeleteCompany }) => {
  return (
    <Button
      size='xs'
      variant='outline'
      colorScheme='red'
      isLoading={isLoading}
      onClick={handleDeleteCompany}>
      Del
    </Button>
  );
};

export default DeleteCompanyBtn;
