import { useState } from 'react';

import { Button, Box, Flex, useDisclosure } from '@chakra-ui/react';
import Header from 'features/user/components/registration/Header';
import CenterContainer from 'components/base/CenterContainer';
import SmallCard from 'components/card/SmallCard';
import { useNavigate } from 'react-router-dom';
import CompanyDisplay from 'features/user/components/registration/addCompany/CompanyDisplay';
import FinishInfoModal from 'features/user/components/registration/addCompany/FinishInfoModal';
import Form from 'features/user/components/registration/addCompany/Form';
import FinishProfileSetupBtn from 'components/button/FinishProfileSetupBtn';
import useGetCompanies from 'features/companySelect/hooks/useGetCompanies';
const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: null,
};

const ProfileCreation = () => {
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
    if (companyList?.length === 0) {
      modalHook.onOpen();
    } else {
      return navigate('/home');
    }
  };

  return (
    <>
      <FinishInfoModal isOpen={modalHook.isOpen} onClose={modalHook.onClose} />
      {/* this main box does not need to be here */}
      <Box as='main'>
        <CenterContainer bg='grey' className='test'>
          <SmallCard>
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
          </SmallCard>
        </CenterContainer>
      </Box>
    </>
  );
};

export default ProfileCreation;
