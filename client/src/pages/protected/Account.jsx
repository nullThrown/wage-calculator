import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Footer from 'components/base/Footer';
import Header from 'components/base/Header';
import MainWrapper from 'components/base/MainWrapper';
import TextInput from 'components/form/TextInput';
import CompanyDisplay from 'features/user/components/registration/addCompany/CompanyDisplay';
import Form from 'features/user/components/registration/addCompany/Form';
import useGetCompanies from 'features/company/hooks/useGetCompanies';

const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: null,
};

const Account = () => {
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
    <MainWrapper isHeader>
      <Header />
      <Box as='section' maxW='68rem' w='98%' m='5em auto 12em'>
        <Flex
          gap='3em'
          mb='8em'
          wrap='wrap'
          justifyContent={['center', 'center', 'flex-start']}>
          <VStack as='form' w='20rem' mb='2em' spacing='1em'>
            <Heading
              as='h2'
              size='md'
              fontWeight='500'
              alignSelf='start'
              mb='1em'>
              Edit Profile
            </Heading>
            <TextInput title='Email' name='email' value={'dio@google.com'} />
            <TextInput title='Username' name='username' value={'dio'} />
            <Button size='sm' colorScheme='facebook' mt='1em'>
              Save Profile
            </Button>
          </VStack>
          <VStack as='form' display='Flex' w='20rem'>
            <Heading
              as='h2'
              size='md'
              fontWeight='500'
              alignSelf='start'
              mb='1em'>
              Change Password
            </Heading>
            <TextInput
              type='password'
              title='Current Password'
              name='currentPassword'
              value=''
            />
            <TextInput
              type='password'
              title='Password'
              name='password'
              value=''
            />
            <TextInput
              type='password'
              title='Confirm Password'
              name='confirmPassword'
              value=''
            />
            <Button size='sm' colorScheme='blackAlpha'>
              Save Password
            </Button>
          </VStack>
        </Flex>
        <CompanyDisplay handleSetEditMode={handleSetEditMode} />
        <Form
          initialCompanyState={initialCompanyState}
          formData={formData}
          setFormData={setFormData}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleCancelEditMode={handleCancelEditMode}
        />
      </Box>
      <Footer />
    </MainWrapper>
  );
};

export default Account;
