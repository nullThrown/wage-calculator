import {
  NumberInput,
  FormLabel,
  NumberInputField,
  FormControl,
  FormErrorMessage,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
} from '@chakra-ui/react';

const NumInput = ({
  title,
  name,
  value,
  onChange,
  isRequired,
  helperText,
  errorMsg,
  isInvalid,
  isDisabled,
  defaultValue,
  placeholder,
  precision,
  min,
  max,
  stepper,
  step,
}) => {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}>
      <FormLabel opacity='.85' htmlFor={name}>
        {title}
      </FormLabel>
      <NumberInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        precision={precision}
        step={step}
        min={min}
        max={max}
        focusBorderColor='blue.400'
        value={value}
        onChange={(value) => onChange(value, name)}
        id={name}
        name={name}>
        <NumberInputField />
        {stepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
    </FormControl>
  );
};

export default NumInput;
