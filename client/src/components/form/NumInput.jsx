import {
  NumberInput,
  FormLabel,
  NumberInputField,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

const NumInput = ({
  name,
  title,
  isRequired,
  isInvalid,
  errorMsg,
  value,
  onChange,
  precision,
  step,
  min,
  max,
}) => {
  return (
    <FormControl m='.7em 0' isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel opacity='.85' htmlFor={name}>
        {title}
      </FormLabel>
      <NumberInput
        defaultValue={0}
        placeholder='0.00'
        precision={precision}
        step={step}
        min={min}
        max={max}
        focusBorderColor='blue.400'
        value={value}
        onChange={onChange}
        id={name}
        name={name}>
        <NumberInputField />
      </NumberInput>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default NumInput;
