import {
  NumberInput,
  FormLabel,
  NumberInputField,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

const NumInput = ({ name, title, isRequired, isInvalid, errorMsg }) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel for={name}>{title}</FormLabel>
      <NumberInput
        defaultValue={0}
        precision={2}
        min={0}
        focusBorderColor='blue.400'
        id={name}
        name={name}>
        <NumberInputField />
      </NumberInput>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default NumInput;
