import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const PositionInput = ({
  isPositionError,
  isValidationError,
  formData,
  handleTextChange,
}) => {
  return (
    <FormControl isInvalid={isPositionError & isValidationError}>
      <FormLabel htmlFor='position'>Position</FormLabel>
      <Input
        name='position'
        id='position'
        value={formData.position}
        onChange={handleTextChange}></Input>
      <FormErrorMessage>Please add a position.</FormErrorMessage>
      <FormHelperText>i.e., server, bartender, etc.</FormHelperText>
    </FormControl>
  );
};

export default PositionInput;
