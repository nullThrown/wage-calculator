import { useState, useEfffect } from 'react';
import CenterContainer from 'components/base/CenterContainer';
import MainHeading from 'components/typography/MainHeading';
import SmallCard from 'components/card/SmallCard';
import {
  Button,
  Text,
  Box,
  Flex,
  useDisclosure,
  Collapse,
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
import CompanyDisplay from 'features/user/components/addCompany/CompanyDisplay';
import FinishInfoModal from 'features/user/components/addCompany/FinishInfoModal';

//--- add transition effect to form

//--- add event listener to Add Company btn that opens form

//--- create form that takes in name, position, hourlyWage, & overtimeMultiplier

//--- add Create Company button to form

//--- btn will send react-query mutation to 'api/company/create-company'

//--- if loading -- display loading icon in Add Company btn

// if success
//--- take returned newCompany and place it into company list
//--- create toast that says success creation
//--- clear form

// if failure
// determine what the failure was
// --if server error -- display server error on Card
// --if validation error -- display error

// --add form validation
// --company name must have len > 0
// --position must have len > 0
// --hourly wage is fine
// --overtime multiplier is fine

// create company Display component
// --company display will be table similar to one found on home
// --except with name, position, salary, multiplier & edit/delete btns
// --add func to delete button
// --delete btn will send DELETE request to 'api/company/delete'
// if successful
// --trigger setCompanyList hook to filter out deleted todo
// --display toast that signifies successful action
// if failure
// --determine error
// --display error

// add func to edit button

// if successful
// replace company list item with updated fields
// create toast that signifies successful action
// if failure
// determine error
// display error

// add Finish Button onto Add Company component
// if (companyList === 0) btn will display modal that let users know they can
//cont. add companies in profile
// modal will give user desc. and two buttons
// btn 1 - cancel
// btn 2 - continue
// btn will redirect user to '/home'

const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0,
  overtimeMultiplier: 1,
};
const ProfileCreation = () => {
  const [newCompany, setNewCompany] = useState(initialCompanyState);
  const [companyList, setCompanyList] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const { isOpen, onToggle } = useDisclosure();
  const modalHook = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const addCompany = useAddCompany();
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
      addCompany.mutate(newCompany, {
        onSuccess: (data, variables, context) => {
          setCompanyList([...companyList, data.data]);
          toast({
            title: 'company Added Successfully!',
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

  const handleFinish = (e) => {
    e.preventDefault();
    if (companyList.length === 0) {
      modalHook.onOpen();
    } else {
      return navigate('/home');
    }
  };

  return (
    <CenterContainer>
      <FinishInfoModal isOpen={modalHook.isOpen} onClose={modalHook.onClose} />
      <SmallCard>
        <MainHeading textAlign='center'>Add Company</MainHeading>
        <Text mt='15px' textAlign='center'>
          Add a company to your profile to begin creating earning's reports
          towards.
        </Text>
        <CompanyDisplay
          companyList={companyList}
          setCompanyList={setCompanyList}
        />

        <Box as='form' m='30px 0 0' boxShadow='5px 5px 10px rgb(220,220,220)'>
          <FormControl isInvalid={isNameError & displayErrors}>
            <FormLabel htmlFor='name'>Company Name</FormLabel>
            <Input
              name='name'
              id='name'
              value={newCompany.name}
              onChange={handleTextChange}></Input>
            <FormErrorMessage>Please add a company name.</FormErrorMessage>
          </FormControl>
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
              If hourly wage is increased by 50% -- set to 1.5.
            </FormHelperText>
          </FormControl>
          {(addCompany.error?.message === 'connection_error' ||
            addCompany.error?.message === 'server_error') && (
            <ErrorText m='.8em 0 0'>
              Something went wrong :) Please Try again
            </ErrorText>
          )}
          <Flex justifyContent='center'>
            <Button
              type='submit'
              colorScheme='green'
              textAlign='center'
              m='30px auto 15px'
              isLoading={addCompany.isLoading ? true : false}
              loadingText='adding'
              onClick={handleAddCompany}>
              Add Company
            </Button>
          </Flex>
        </Box>
        <Flex justify='center' mt='4em'>
          <Button colorScheme='telegram' size='lg' onClick={handleFinish}>
            Finish
          </Button>
        </Flex>
      </SmallCard>
    </CenterContainer>
  );
};

export default ProfileCreation;
