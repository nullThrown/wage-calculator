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
} from '@chakra-ui/react';
import useAddCompany from 'features/user/hooks/useAddCompany';
import ErrorMsg from 'components/typography/ErrorMsg';
import ErrorText from 'components/typography/ErrorText';

//--- add transition effect to form

//--- add event listener to Add Company btn that opens form

//--- create form that takes in name, position, hourlyWage, & overtimeMultiplier

//--- add Create Company button to form

//--- btn will send react-query mutation to 'api/company/create-company'

//--- if loading -- display loading icon in Add Company btn

// if success
//--- take returned newCompany and place it into company list
//--- create toast that says success creation
//---!! clear form -- error hourlyWage field is not cleared!!

// if failure
// determine what the failure was
// if server error -- display server error on Card
// if validation error -- display error

// create company Display component
// company display will be table similar to one found on home
// except with name, position, salary, multiplier & edit/delete btns

// edit btn will allow edit in place by changing table cells into inputs
// if successful
// replace company list item with updated fields
// create toast that signifies successful action
// if failure
// determine error
// display error

// delete btn will send DELETE request to 'api/company/delete'
// if successful
// remove company from company list
// display toast that signifies successful action
// if failure
// determine error
// display error

// add Finish Button onto Add Company component
// btn will redirect user to '/home'
const initialCompanyState = {
  name: '',
  position: '',
  hourlyWage: 0.0,
  overtimeMultiplier: 1,
};
const ProfileCreation = () => {
  const [newCompany, setNewCompany] = useState(initialCompanyState);
  const [companyList, setCompanyList] = useState([]);

  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  const addCompany = useAddCompany();

  const handleNumberChange = (value, name) => {
    setNewCompany({ ...newCompany, [name]: value });
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addCompany.mutate(newCompany, {
      onSuccess: (data, variables, context) => {
        console.log(data.data);
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
  };

  return (
    <CenterContainer>
      <SmallCard>
        <MainHeading textAlign='center'>Add Company</MainHeading>
        <Text mt='15px' textAlign='center'>
          Add a company to your profile to begin creating earning's reports
          towards.
        </Text>
        <Button
          colorScheme='blackAlpha'
          display='block'
          m='20px auto 0'
          onClick={onToggle}>
          {isOpen ? 'Close' : 'Open'} Form
        </Button>
        <Collapse in={isOpen}>
          <Box as='form' m='10px 0'>
            {(addCompany.error?.message === 'connection_error' ||
              addCompany.error?.message === 'server_error') && (
              <ErrorText>Something went wrong :) Please Try again</ErrorText>
            )}
            <FormControl>
              <FormLabel htmlFor='name'>Company Name</FormLabel>
              <Input
                name='name'
                id='name'
                value={newCompany.name}
                onChange={handleTextChange}></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='position'>Position</FormLabel>
              <Input
                name='position'
                id='position'
                value={newCompany.position}
                onChange={handleTextChange}></Input>
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
                value={newCompany.hourlywage}
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
            <Flex justifyContent='center'>
              <Button
                type='submit'
                colorScheme='green'
                textAlign='center'
                m='30px auto 15px'
                isLoading={addCompany.isLoading ? true : false}
                loadingText='adding'
                onClick={handleSubmit}>
                Add Company
              </Button>
            </Flex>
          </Box>
        </Collapse>
      </SmallCard>
    </CenterContainer>
  );
};

export default ProfileCreation;
