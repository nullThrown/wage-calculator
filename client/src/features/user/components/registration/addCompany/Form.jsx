import { useState } from 'react';
import { Box, Flex, ButtonGroup, useToast } from '@chakra-ui/react';
import ErrorText from 'components/typography/ErrorText';
import EditCompanyBtn from './EditCompanyBtn';
import CancelEditBtn from './CancelEditBtn';
import AddCompanyBtn from './AddCompanyBtn';
import useAddCompany from 'features/user/hooks/useAddCompany';
import useUpdateCompany from 'features/user/hooks/useUpdateCompany';
import useAddCompanyVal from 'features/auth/hooks/useAddCompanyVal';
import TextInput from 'components/form/TextInput';
import NumInput from 'components/form/NumInput';

const Form = ({
  initialCompanyState,
  formData,
  setFormData,
  setCompanyList,
  isEditMode,
  setIsEditMode,
  handleCancelEditMode,
}) => {
  const [isValidationError, setisValidationError] = useState(false);

  const toast = useToast();
  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const { isNameError, isPositionError } = useAddCompanyVal(formData);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();

    if (isNameError || isPositionError) {
      setisValidationError(true);
    } else {
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

  return (
    <Box as='form' m='30px 0 0' boxShadow='5px 5px 10px rgb(220,220,220)'>
      <TextInput
        title='Company Name'
        name='name'
        value={formData.name}
        onChange={handleTextChange}
        isInvalid={isNameError & isValidationError}
        errorMsg='Please add a company name'
      />

      <TextInput
        title='Position'
        name='position'
        value={formData.position}
        onChange={handleTextChange}
        helperText='e.g., server, bartender, etc.'
        isInvalid={isPositionError & isValidationError}
        errorMsg='Please add a position'
      />
      <NumInput
        title='Hourly Wage'
        name='hourlyWage'
        value={formData.hourlyWage}
        onChange={handleNumberChange}
        precision={2}
        min={0}
        stepper
      />
      <NumInput
        title='Overtime Multiplier'
        name='overtimeMultiplier'
        value={formData.overtimeMultiplier}
        onChange={handleNumberChange}
        helperText='if hourly wage is increased by %50, set to 1.5'
        precision={1}
        min={1}
        stepper
        step={0.1}
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
            <CancelEditBtn handleCancelEditMode={handleCancelEditMode} />
          </ButtonGroup>
        ) : (
          <AddCompanyBtn
            addCompany={addCompany}
            handleAddCompany={handleAddCompany}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Form;
