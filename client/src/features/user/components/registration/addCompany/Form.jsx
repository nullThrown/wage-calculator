import { useState } from 'react';
import { Box, Flex, ButtonGroup, useToast } from '@chakra-ui/react';
import NameInput from './NameInput';
import PositionInput from './PositionInput';
import WageInput from './WageInput';
import OvertimeInput from './OvertimeInput';
import ErrorText from 'components/typography/ErrorText';
import EditCompanyBtn from './EditCompanyBtn';
import CancelEditBtn from './CancelEditBtn';
import AddCompanyBtn from './AddCompanyBtn';
import useAddCompany from 'features/user/hooks/useAddCompany';
import useUpdateCompany from 'features/user/hooks/useUpdateCompany';
import useAddCompanyVal from 'features/auth/hooks/useAddCompanyVal';

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
      // local state be updated with a mutation?

      // form
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

  return (
    <Box as='form' m='30px 0 0' boxShadow='5px 5px 10px rgb(220,220,220)'>
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

      <WageInput formData={formData} handleNumberChange={handleNumberChange} />

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
