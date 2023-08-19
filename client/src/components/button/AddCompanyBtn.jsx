import { Button } from '@chakra-ui/react';
const AddCompanyBtn = ({ isLoading, handleAddCompany }) => {
  return (
    <Button
      type='submit'
      colorScheme='green'
      textAlign='center'
      isLoading={isLoading}
      loadingText='Adding'
      onClick={handleAddCompany}>
      Add Company
    </Button>
  );
};

export default AddCompanyBtn;
