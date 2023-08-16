import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

const XAxisFilter = ({ graphFilters, handleXAxisChange }) => {
  return (
    <FormControl flexBasis='100%'>
      <FormLabel opacity='.85'>Group Data (X-axis)</FormLabel>
      <Select
        maxW='10rem'
        minW='7rem'
        size='sm'
        onChange={handleXAxisChange}
        value={graphFilters.XAxis}>
        <option value='byDay'>By Day</option>
        <option value='byMonth'>By Month</option>
        <option value='byYear'>By Year</option>
      </Select>
    </FormControl>
  );
};

export default XAxisFilter;
