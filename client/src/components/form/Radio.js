import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const RadioGrp = () => {
  return (
    <RadioGroup defaultValue='morning'>
      <Stack direction='row'>
        <Radio size='lg' value='morning'>
          Morning
        </Radio>
        <Radio size='lg' value='night'>
          Night
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default RadioGrp;
