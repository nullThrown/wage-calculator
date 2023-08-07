import { useState } from 'react';

import { Flex, useDisclosure, Container } from '@chakra-ui/react';
import Header from 'features/user/components/registration/Header';
import MainContainer from 'components/base/Container';
import { useNavigate } from 'react-router-dom';
import CompanyDisplay from 'features/user/components/registration/addCompany/CompanyDisplay';
import FinishInfoModal from 'features/user/components/registration/addCompany/FinishInfoModal';
import Form from 'features/user/components/registration/addCompany/Form';
import FinishProfileSetupBtn from 'components/button/FinishProfileSetupBtn';
import useGetCompanies from 'features/company/hooks/useGetCompanies';
import MainWrapper from 'components/base/MainWrapper';
import Footer from 'components/base/Footer';
import FormContainer from 'components/base/FormContainer';
const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: null,
};

const AddCompany = () => {
  const [formData, setFormData] = useState(initialCompanyState);
  const { companyList } = useGetCompanies();
  const [isEditMode, setIsEditMode] = useState(false);

  const modalHook = useDisclosure();
  const navigate = useNavigate();

  const handleSetEditMode = (companyToBeUpdated) => {
    setIsEditMode(true);
    setFormData(companyToBeUpdated);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setFormData(initialCompanyState);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (companyList?.length === 0) modalHook.onOpen();
    else return navigate('/home');
  };

  return (
    <MainWrapper>
      <FinishInfoModal isOpen={modalHook.isOpen} onClose={modalHook.onClose} />
      <FormContainer>
        <Header />
        <CompanyDisplay handleSetEditMode={handleSetEditMode} />
        <Form
          initialCompanyState={initialCompanyState}
          formData={formData}
          setFormData={setFormData}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleCancelEditMode={handleCancelEditMode}
        />

        <Flex justify='center' mt='4em'>
          <FinishProfileSetupBtn handleFinish={handleFinish} />
        </Flex>
      </FormContainer>
      <Footer />
    </MainWrapper>
  );
};

export default AddCompany;
