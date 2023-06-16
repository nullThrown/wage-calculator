import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
const TextInput = ({
  title,
  name,
  type,
  value,
  onChange,
  helperText,
  isInvalid,
  isDisabled,
  errorMsg,
}) => {
  return (
    <FormControl isInvalid={isInvalid} isDisabled={isDisabled}>
      <FormLabel htmlFor={name} opacity='.85'>
        {title}
      </FormLabel>
      <Input
        type={type ? type : 'text'}
        id={name}
        value={value}
        name={name}
        onChange={(e) => onChange(e)}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextInput;
