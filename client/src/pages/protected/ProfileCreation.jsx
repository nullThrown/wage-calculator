import { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ErrorText from 'components/typography/ErrorText';
import Header from 'features/user/components/registration/Header';
import CenterContainer from 'components/base/CenterContainer';
import SmallCard from 'components/card/SmallCard';
import NameInput from 'features/user/components/registration/addCompany/NameInput';
import PositionInput from 'features/user/components/registration/addCompany/PositionInput';
import WageInput from 'features/user/components/registration/addCompany/WageInput';
import OvertimeInput from 'features/user/components/registration/addCompany/OvertimeInput';
import AddCompanyBtn from 'features/user/components/registration/addCompany/AddCompanyBtn';
import EditCompanyBtn from 'features/user/components/registration/addCompany/EditCompanyBtn';
import CancelEditBtn from 'features/user/components/registration/addCompany/CancelEditBtn';
import { useNavigate } from 'react-router-dom';
import useAddCompany from 'features/user/hooks/useAddCompany';
import useAddCompanyVal from 'features/auth/hooks/useAddCompanyVal';
import useUpdateCompany from 'features/user/hooks/useUpdateCompany';
import CompanyDisplay from 'features/user/components/registration/addCompany/CompanyDisplay';
import FinishInfoModal from 'features/user/components/registration/addCompany/FinishInfoModal';

// undefined value is used when edit mode is set == true
const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: null,
};

const ProfileCreation = () => {
  const [formData, setFormData] = useState(initialCompanyState);
  const [companyList, setCompanyList] = useState([]);
  const [isValidationError, setisValidationError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const modalHook = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const { isNameError, isPositionError } = useAddCompanyVal(formData);

  const handleNumberChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();

    if (isNameError || isPositionError) {
      setisValidationError(true);
    } else {
      // should local state be updated with a mutation?
      // should local state not be used at all in lieu of a proper query?
      addCompany.mutate(formData, {
        onSuccess: (data, variables, context) => {
          setCompanyList(data.data);
          toast({
            title: 'Company Added Successfully!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          setFormData(initialCompanyState);
        },
        onError: (error, variables, context) => {
          console.log(error.message);
        },
      });
      setisValidationError(false);
    }
  };

  const handleUpdateCompany = (e, updatedCompany) => {
    e.preventDefault();
    console.log(updatedCompany);
    updateCompany.mutate(updatedCompany, {
      onSuccess: (data, variables, context) => {
        setCompanyList(data.data);
        toast({
          title: 'Company Updated Successfully!',
          status: 'success',
          duration: '5000',
          isClosable: true,
          position: 'top',
        });
        setIsEditMode(false);
        setFormData(initialCompanyState);
      },
      onError: (error, variables, context) => {
        console.log(error);
      },
    });
  };

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
    if (companyList.length === 0) {
      modalHook.onOpen();
    } else {
      return navigate('/home');
    }
  };

  return (
    <>
      <FinishInfoModal isOpen={modalHook.isOpen} onClose={modalHook.onClose} />
      <Box as='main'>
        <CenterContainer bg='grey' className='test'>
          <SmallCard>
            <Header />
            <CompanyDisplay
              companyList={companyList}
              setCompanyList={setCompanyList}
              handleSetEditMode={handleSetEditMode}
            />
            {/* separate this into component called Form */}
            <Box
              as='form'
              m='30px 0 0'
              boxShadow='5px 5px 10px rgb(220,220,220)'>
              <NameInput
                isNameError={isNameError}
                isValidationError={isValidationError}
                formData={formData}
                handleTextChange={handleTextChange}
              />

              <PositionInput
                isPositionError={isPositionError}
                isValidationError={isValidationError}
                formData={formData}
                handleTextChange={handleTextChange}
              />

              <WageInput
                formData={formData}
                handleNumberChange={handleNumberChange}
              />

              <OvertimeInput
                formData={formData}
                handleNumberChange={handleNumberChange}
              />

              {/* updateCompany.error should check this as well */}
              {(addCompany.error?.message === 'connection_error' ||
                addCompany.error?.message === 'server_error') && (
                // separate this ErrorText into typography folder
                <ErrorText m='.8em 0 0'>
                  Something went wrong :) Please Try again
                </ErrorText>
              )}

              <Flex justifyContent='center'>
                {isEditMode ? (
                  <ButtonGroup gap='3'>
                    <EditCompanyBtn
                      updateCompany={updateCompany}
                      handleUpdateCompany={handleUpdateCompany}
                      formData={formData}
                    />
                    <CancelEditBtn
                      handleCancelEditMode={handleCancelEditMode}
                    />
                  </ButtonGroup>
                ) : (
                  <AddCompanyBtn
                    addCompany={addCompany}
                    handleAddCompany={handleAddCompany}
                  />
                )}
              </Flex>
            </Box>
            <Flex justify='center' mt='4em'>
              <Button colorScheme='telegram' size='lg' onClick={handleFinish}>
                Finish
              </Button>
            </Flex>
          </SmallCard>
        </CenterContainer>
      </Box>
    </>
  );
};

export default ProfileCreation;
