import { Select, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CompanyDisplay from './CompanyDisplay';
const CompanySelect = ({ filter, setFilter }) => {
  // filter companies will need to be supplemented from user.companies
  // pull user.companies from user cache
  // map companies to name only -- place those into filter options
  // if single company is selected -- match name with user.companies
  // place user.company into companyDisplay
  const [filterOptions, setFilterOptions] = useState([
    'all',
    'active',
    'Punch Bowl Social',
    'Iron Cactus',
  ]);
  //supplement filterOptions
  // useEffect(() => {
  //   setFilterOptions([...filterOptions, user.Companies]);
  // }, [user]);

  const onFilterChange = (e) => setFilter(e.target.value);
  return (
    <Box>
      <Select
        placeholder='select filter'
        variant='filled'
        value={filter}
        onChange={onFilterChange}>
        {filterOptions.map((filter) => {
          return <option value={filter}>{filter}</option>;
        })}
      </Select>
      <CompanyDisplay />
    </Box>
  );
};

export default CompanySelect;
