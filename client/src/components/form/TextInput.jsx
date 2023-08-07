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
  isRequired,
  isInvalid,
  isDisabled,
  errorMsg,
}) => {
  return (
    <FormControl
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}>
      <FormLabel htmlFor={name} opacity='.9' mb='4px'>
        {title}
      </FormLabel>
      <Input
        height='var(--chakra-sizes-9)'
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
