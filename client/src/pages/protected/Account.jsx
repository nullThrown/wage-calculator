import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Footer from 'components/base/Footer';
import Header from 'components/base/Header';
import MainWrapper from 'components/base/MainWrapper';
import CompanyDisplay from 'features/user/components/registration/addCompany/CompanyDisplay';
import Form from 'features/user/components/registration/addCompany/Form';
import EditPersonal from 'features/user/components/editProfile/EditPersonal';
import ChangePassword from 'features/user/components/editProfile/ChangePassword';
import FormContainer from 'components/base/FormContainer';
import MainNav from 'components/nav/MainNav';

const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: null,
  totalSalesApplicable: true,
  isActive: true,
};

const Account = () => {
  const [formData, setFormData] = useState(initialCompanyState);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSetEditMode = (companyToBeUpdated) => {
    setIsEditMode(true);
    setFormData(companyToBeUpdated);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setFormData(initialCompanyState);
  };

  return (
    <MainWrapper isHeader>
      <Header />
      <MainNav />
      <Box as='section' maxW='64rem' w='98%' m='5em auto 12em'>
        <Flex
          gap='3em'
          mb='8em'
          wrap='wrap'
          justifyContent={['center', 'center', 'flex-start']}>
          <EditPersonal />
          <ChangePassword />
        </Flex>
        <FormContainer>
          <CompanyDisplay handleSetEditMode={handleSetEditMode} />
          <Form
            initialCompanyState={initialCompanyState}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            handleCancelEditMode={handleCancelEditMode}
          />
        </FormContainer>
      </Box>
      <Footer />
    </MainWrapper>
  );
};

export default Account;
