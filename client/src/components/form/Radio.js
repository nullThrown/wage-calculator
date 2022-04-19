import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const ShiftRadioGroup = ({ onChange, value }) => {
  return (
    <RadioGroup
      defaultValue='morning'
      name='shiftTime'
      onChange={onChange}
      value={value}>
      <Stack direction='row' spacing={4}>
        <Radio size='md' value='morning' colorScheme='yellow'>
          Morning
        </Radio>
        <Radio size='md' value='afternoon' colorScheme='teal'>
          Afternoon
        </Radio>
        <Radio size='md' value='night'>
          Night
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default ShiftRadioGroup;
