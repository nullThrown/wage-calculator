import { Select, Box } from '@chakra-ui/react';
import TertHeading from 'components/typography/TertHeading';
import CompanyDisplay from './CompanyDisplay';
import useGetCompanies from '../hooks/useGetCompanies';

const CompanySelect = ({ filter, setFilter }) => {
  const { isLoading, isError, companyList } = useGetCompanies();

  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <Box>
      <Box m='1em 0'>
        <TertHeading textAlign='center'>Filter Companies</TertHeading>
      </Box>
      <Select variant='filled' value={filter} onChange={handleFilterChange}>
        <option key='1' value='all'>
          All
        </option>
        <option key='2' value='active'>
          Active
        </option>
        {companyList.map((company) => {
          return (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          );
        })}
      </Select>
      <CompanyDisplay filter={filter} />
    </Box>
  );
};

export default CompanySelect;
