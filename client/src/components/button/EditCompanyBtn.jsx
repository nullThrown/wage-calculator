import { Button } from '@chakra-ui/react';

const EditCompanyBtn = ({ isLoading, handleUpdateCompany }) => {
  return (
    <Button
      type='submit'
      colorScheme='yellow'
      textAlign='center'
      m='30px auto 15px'
      isLoading={isLoading}
      loadingText='Updating'
      onClick={handleUpdateCompany}>
      Edit Company
    </Button>
  );
};

export default EditCompanyBtn;
