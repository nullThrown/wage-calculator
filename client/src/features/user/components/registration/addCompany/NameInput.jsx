import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

const NameInput = ({
  isNameError,
  isValidationError,
  formData,
  handleTextChange,
}) => {
  return (
    <FormControl isInvalid={isNameError & isValidationError}>
      <FormLabel htmlFor='name'>Company Name</FormLabel>
      <Input
        name='name'
        id='name'
        value={formData.name}
        onChange={handleTextChange}></Input>
      <FormErrorMessage>Please add a company name.</FormErrorMessage>
    </FormControl>
  );
};

export default NameInput;
