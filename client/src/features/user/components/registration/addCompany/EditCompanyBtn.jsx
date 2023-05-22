import { Button } from '@chakra-ui/react';

const EditCompanyBtn = ({ updateCompany, handleUpdateCompany, formData }) => {
  return (
    <Button
      type='submit'
      colorScheme='yellow'
      textAlign='center'
      m='30px auto 15px'
      isLoading={updateCompany.isLoading ? true : false}
      loadingText='Updating'
      onClick={(e) => handleUpdateCompany(e, formData)}>
      Edit Company
    </Button>
  );
};

export default EditCompanyBtn;
