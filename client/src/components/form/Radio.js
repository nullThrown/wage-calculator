import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const RadioGrp = () => {
  return (
    <RadioGroup defaultValue='morning'>
      <Stack direction='row' spacing={4}>
        <Radio size='md' value='morning' colorScheme='yellow'>
          Morning
        </Radio>
        <Radio size='md' value='night'>
          Night
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default RadioGrp;
