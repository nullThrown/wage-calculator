import { Select, Box } from '@chakra-ui/react';
import { useState } from 'react';
import CompanyDisplay from './CompanyDisplay';
const CompanySelect = () => {
  const [filters, setFilters] = useState([
    'all',
    'active',
    'Punch Bowl Social',
    'Iron Cactus',
  ]);
  return (
    <Box>
      <Select placeholder='select filter' variant='filled'>
        {filters.map((filter) => {
          return <option value={filter}>{filter}</option>;
        })}
      </Select>
      <CompanyDisplay />
    </Box>
  );
};

export default CompanySelect;
