import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const WageInput = ({ formData, handleNumberChange }) => {
  return (
    <FormControl>
      <FormLabel htmlFor='hourlywage'>Hourly Wage</FormLabel>
      <NumberInput
        name='hourlyWage'
        id='hourlyWage'
        min={0}
        step={1}
        precision={2}
        value={formData.hourlyWage}
        onChange={(value) => handleNumberChange(value, 'hourlyWage')}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default WageInput;
