import { useState } from 'react';
import CenterContainer from 'components/base/CenterContainer';
import MainHeading from 'components/typography/MainHeading';
import SmallCard from 'components/card/SmallCard';
import {
  Button,
  Text,
  Box,
  Flex,
  useDisclosure,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAddCompany from 'features/user/hooks/useAddCompany';
import ErrorText from 'components/typography/ErrorText';
import useAddCompanyVal from 'features/auth/hooks/useAddCompanyVal';
import useUpdateCompany from 'features/user/hooks/useUpdateCompany';
import CompanyDisplay from 'features/user/components/addCompany/CompanyDisplay';
import FinishInfoModal from 'features/user/components/addCompany/FinishInfoModal';

// undefined value is used when edit mode is set == true
const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
  _id: undefined,
};
const ProfileCreation = () => {
  // rename to formData
  const [newCompany, setNewCompany] = useState(initialCompanyState);
  const [companyList, setCompanyList] = useState([]);
  //renamed to isValidationError
  const [displayErrors, setDisplayErrors] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { isOpen, onToggle } = useDisclosure();
  const modalHook = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const { isNameError, isPositionError } = useAddCompanyVal(newCompany);

  const handleNumberChange = (value, name) => {
    setNewCompany({ ...newCompany, [name]: value });
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();

    if (isNameError || isPositionError) {
      setDisplayErrors(true);
    } else {
      // should local state be updated with a mutation?
      // should local state not be used at all in lieu of a proper query?
      addCompany.mutate(newCompany, {
        onSuccess: (data, variables, context) => {
          setCompanyList(data.data);
          toast({
            title: 'Company Added Successfully!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          setNewCompany(initialCompanyState);
        },
        onError: (error, variables, context) => {
          console.log(error.message);
        },
      });
      setDisplayErrors(false);
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
        setNewCompany(initialCompanyState);
      },
      onError: (error, variables, context) => {
        console.log(error);
      },
    });
  };

  const handleSetEditMode = (companyToBeUpdated) => {
    setIsEditMode(true);
    setNewCompany(companyToBeUpdated);
  };

  const handleCancelEditMode = () => {
    setIsEditMode(false);
    setNewCompany(initialCompanyState);
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
            {/* separate this into component called header */}
            <MainHeading textAlign='center'>Add Company</MainHeading>
            <Text mt='15px' textAlign='center'>
              Add a company to your profile to begin creating earning's reports
              towards.
            </Text>
            {/*  */}
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
              {/* separate this into component called NameInput */}
              <FormControl isInvalid={isNameError & displayErrors}>
                <FormLabel htmlFor='name'>Company Name</FormLabel>
                <Input
                  name='name'
                  id='name'
                  value={newCompany.name}
                  onChange={handleTextChange}></Input>
                <FormErrorMessage>Please add a company name.</FormErrorMessage>
              </FormControl>
              {/*  */}
              {/* separate this into component called PositionInput */}
              <FormControl isInvalid={isPositionError & displayErrors}>
                <FormLabel htmlFor='position'>Position</FormLabel>
                <Input
                  name='position'
                  id='position'
                  value={newCompany.position}
                  onChange={handleTextChange}></Input>
                <FormErrorMessage>Please add a position.</FormErrorMessage>
                <FormHelperText>i.e., server, bartender, etc.</FormHelperText>
              </FormControl>
              {/*  */}
              {/* separate this into component called WageInput */}
              <FormControl>
                <FormLabel htmlFor='hourlywage'>Hourly Wage</FormLabel>
                <NumberInput
                  name='hourlyWage'
                  id='hourlyWage'
                  min={0}
                  step={1}
                  precision={2}
                  value={newCompany.hourlyWage}
                  onChange={(value) => handleNumberChange(value, 'hourlyWage')}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              {/*  */}
              {/* separate this into component called OvertimeInput */}
              <FormControl>
                <FormLabel htmlFor='overtimeMultiplier'>
                  Overtime Multiplier
                </FormLabel>
                <NumberInput
                  name='overtimeMultiplier'
                  id='overtimeMultiplier'
                  min={1}
                  step={0.1}
                  precision={2}
                  value={newCompany.overtimeMultiplier}
                  onChange={(value) =>
                    handleNumberChange(value, 'overtimeMultiplier')
                  }>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  If hourly wage is increased by 50% set to 1.5.
                </FormHelperText>
              </FormControl>
              {/*  */}
              {/* updateCompany.error should check this as well */}
              {(addCompany.error?.message === 'connection_error' ||
                addCompany.error?.message === 'server_error') && (
                // separate this ErrorText into typography folder
                <ErrorText m='.8em 0 0'>
                  Something went wrong :) Please Try again
                </ErrorText>
              )}
              {/* separate buttons into components/buttons folder  */}
              <Flex justifyContent='center'>
                {!isEditMode ? (
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
                ) : (
                  <Button
                    type='submit'
                    colorScheme='yellow'
                    textAlign='center'
                    m='30px auto 15px'
                    isLoading={updateCompany.isLoading ? true : false}
                    loadingText='Updating'
                    onClick={(e) => handleUpdateCompany(e, newCompany)}>
                    Edit Company
                  </Button>
                )}
                {isEditMode && (
                  <Button
                    type='button'
                    colorScheme='red'
                    onClick={handleCancelEditMode}>
                    Cancel
                  </Button>
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
