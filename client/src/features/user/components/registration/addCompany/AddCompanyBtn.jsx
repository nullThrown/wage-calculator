import { Button } from '@chakra-ui/react';
const AddCompanyBtn = ({ addCompany, handleAddCompany }) => {
  return (
    <Button
      type='submit'
      colorScheme='green'
      textAlign='center'
      m='30px auto 15px'
      isLoading={addCompany.isLoading ? true : false}
      loadingText='Adding'
      onClick={handleAddCompany}>
      Add Company
    </Button>
  );
};

export default AddCompanyBtn;
