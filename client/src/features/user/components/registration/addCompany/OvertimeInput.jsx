import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
} from '@chakra-ui/react';

const OvertimeInput = ({ formData, handleNumberChange }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='overtimeMultiplier'>Overtime Multiplier</FormLabel>
      <NumberInput
        name='overtimeMultiplier'
        id='overtimeMultiplier'
        min={1}
        step={0.1}
        precision={2}
        value={formData.overtimeMultiplier}
        onChange={(value) => handleNumberChange(value, 'overtimeMultiplier')}>
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
  );
};

export default OvertimeInput;
