import {
  FormControl,
  NumberInput,
  FormLabel,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';

export const TimeInput = ({ name, title, isRequired, isInvalid, errorMsg }) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel opacity='.85' htmlFor={name}>
        {title}
      </FormLabel>
      <HStack spacing='10px'>
        <FormHelperText>Hours</FormHelperText>
        <NumberInput
          defaultValue={0}
          precision={0}
          min={0}
          focusBorderColor='blue.400'
          id={name}
          name={name}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>Minutes</FormHelperText>
        <NumberInput
          defaultValue={0}
          precision={0}
          step={5}
          min={0}
          max={59}
          focusBorderColor='blue.400'
          id={name}
          name={name}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
};
export default TimeInput;
