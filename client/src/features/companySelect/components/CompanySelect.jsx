import { Select } from '@chakra-ui/react';
import { useState } from 'react';

const CompanySelect = () => {
  const [filters, setFilters] = useState([
    'all',
    'active',
    'Punch Bowl Social',
    'Iron Cactus',
  ]);
  return (
    <Select placeholder='select filter' variant='filled'>
      {filters.map((filter) => {
        return <option value='filter'>{filter}</option>;
      })}
    </Select>
  );
};

export default CompanySelect;
