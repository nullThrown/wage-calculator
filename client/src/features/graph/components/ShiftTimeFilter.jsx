import { FormControl, Switch, FormLabel } from '@chakra-ui/react';

const ShiftTimeFilter = ({ handleShiftTimeChange, graphFilters }) => {
  return (
    <FormControl display='flex' alignItems='center'>
      <FormLabel htmlFor='filter-morning-night' opacity='.85'>
        Filter Morning & Night
      </FormLabel>
      <Switch
        id='filter-morning-night'
        onChange={handleShiftTimeChange}
        colorScheme='teal'
        isChecked={graphFilters.shiftTime}
      />
    </FormControl>
  );
};

export default ShiftTimeFilter;
