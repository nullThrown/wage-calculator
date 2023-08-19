import {
  RadioGroup,
  HStack,
  Radio,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const YAxisFilter = ({ graphFilters, handleYAxisChange }) => {
  return (
    <FormControl flexBasis='100%' as='fieldset'>
      <FormLabel as='legend' opacity='.85'>
        amounts (Y-axis)
      </FormLabel>
      <RadioGroup
        size='sm'
        colorScheme='teal'
        defaultValue={graphFilters.YAxis}
        value={graphFilters.YAxis}
        onChange={handleYAxisChange}>
        <HStack>
          <Radio value='totalPerHour'>Total Per Hour</Radio>
          <Radio value='avgTotalPerShift'>Avg Total Per Shift</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default YAxisFilter;
