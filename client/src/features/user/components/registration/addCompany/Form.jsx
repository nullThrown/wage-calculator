import { useState } from 'react';
import { Box, Flex, ButtonGroup, useToast } from '@chakra-ui/react';
import useAddCompany from 'features/company/hooks/useAddCompany';
import useUpdateCompany from 'features/company/hooks/useUpdateCompany';
import useAddCompanyVal from 'features/company/hooks/useValidateAddCompany';
import TextInput from 'components/form/TextInput';
import NumInput from 'components/form/NumInput';
import CancelEditBtn from 'components/button/CancelEditBtn';
import EditCompanyBtn from 'components/button/EditCompanyBtn';
import AddCompanyBtn from 'components/button/AddCompanyBtn';
import { successToast, errorToast } from 'components/toast/toast';
import { connection_error, server_error } from 'constants/api/error';
import { useQueryClient } from 'react-query';

const Form = ({
  initialCompanyState,
  formData,
  setFormData,
  isEditMode,
  setIsEditMode,
  handleCancelEditMode,
}) => {
  const [isValidationError, setisValidationError] = useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();
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
          queryClient.setQueryData(['companies'], data);
          toast({ ...successToast, title: 'Company Added Successfully!' });
          setFormData(initialCompanyState);
        },
        onError: (error, variables, context) => {
          const { message } = error;
          if (message === server_error || message === connection_error) {
            toast({ ...errorToast });
          }
        },
      });
      setisValidationError(false);
    }
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    updateCompany.mutate(formData, {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(['companies'], data);
        toast({ ...successToast, title: 'Company Updated Successfully!' });
        setIsEditMode(false);
        setFormData(initialCompanyState);
      },
      onError: (error, variables, context) => {
        const { message } = error;
        if (message === server_error || message === connection_error) {
          toast({ ...errorToast });
        }
      },
    });
  };

  return (
    <Box
      as='form'
      mt='3rem'
      display='flex'
      flexDir='column'
      gap='1.4em'
      padding='2em'
      boxShadow='5px 5px 10px rgb(220,220,220)'>
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
        helperText='If hourly wage is increased by %50, set to 1.5'
        precision={1}
        min={1}
        stepper
        step={0.1}
      />

      <Flex justifyContent='center' alignItems='center' m='2em 0 .6em'>
        {isEditMode ? (
          <>
            <EditCompanyBtn
              handleUpdateCompany={handleUpdateCompany}
              isLoading={updateCompany.isLoading}
            />
            <CancelEditBtn handleCancelEditMode={handleCancelEditMode} />
          </>
        ) : (
          <AddCompanyBtn
            isLoading={addCompany.isLoading}
            handleAddCompany={handleAddCompany}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Form;
