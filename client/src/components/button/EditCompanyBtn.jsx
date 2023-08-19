import { Button } from '@chakra-ui/react';

const EditCompanyBtn = ({ isLoading, handleUpdateCompany }) => {
  return (
    <Button
      type='submit'
      colorScheme='yellow'
      textAlign='center'
      isLoading={isLoading}
      mr='.8em'
      loadingText='Updating'
      onClick={handleUpdateCompany}>
      Edit Company
    </Button>
  );
};

export default EditCompanyBtn;
