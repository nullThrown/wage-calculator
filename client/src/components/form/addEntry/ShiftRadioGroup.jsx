import { Radio, RadioGroup, Stack, Flex, FormLabel } from '@chakra-ui/react';

const ShiftRadioGroup = ({ onChange, value }) => {
  return (
    <Flex flexDirection='column' ml='2em' mt='0' p='0'>
      <FormLabel opacity='.85'>Shift Time</FormLabel>
      <RadioGroup
        mt='.4em'
        defaultValue='morning'
        name='shiftTime'
        onChange={onChange}
        value={value}>
        <Stack direction='row' spacing={4}>
          <Radio size='md' value='morning' colorScheme='yellow'>
            Morning
          </Radio>
          <Radio size='md' value='night'>
            Night
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default ShiftRadioGroup;
