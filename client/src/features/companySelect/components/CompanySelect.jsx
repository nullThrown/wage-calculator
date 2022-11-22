import { Select, Box } from '@chakra-ui/react';
import QuatHeading from 'components/typography/QuatHeading';
import TertHeading from 'components/typography/TertHeading';
import axios from 'config/axios';
import { useEffect, useState } from 'react';
import CompanyDisplay from './CompanyDisplay';
import { useQuery, queryCache } from 'react-query';
import { getUser } from 'features/auth/api/auth';
const CompanySelect = ({ filter, setFilter }) => {
  const [filterOptions, setFilterOptions] = useState(['all', 'active']);
  const user = useQuery(['user'], getUser, {
    initialData: () => {
      return queryCache.getQueryData('user');
    },
  });

  useEffect(() => {
    setFilterOptions([
      ...filterOptions,
      user?.data?.companies.map((comp) => comp.name),
    ]);
  }, [user.data]);
  const onFilterChange = (e) => setFilter(e.target.value);
  return (
    <Box>
      <Box m='1em 0'>
        <TertHeading textAlign='center'>Filter Companies</TertHeading>
      </Box>
      <Select variant='filled' value={filter} onChange={onFilterChange}>
        {filterOptions.map((filter, i) => {
          return (
            <option key={i} value={filter}>
              {filter}
            </option>
          );
        })}
      </Select>
      <CompanyDisplay />
    </Box>
  );
};

export default CompanySelect;
