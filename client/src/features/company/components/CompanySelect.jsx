import { Select, Box, Spinner, Heading } from '@chakra-ui/react';
import CompanyDisplay from './CompanyDisplay';
import useGetCompanies from '../hooks/useGetCompanies';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';

const CompanySelect = ({ filter, setFilter }) => {
  const { isLoading, isError, companyList } = useGetCompanies();

  const handleFilterChange = (e) => setFilter(e.target.value);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <Box>
      <Box m='1em 0'>
        <Heading
          textAlign='center'
          as='h2'
          fontSize='3xl'
          opacity='.95'
          fontWeight='500'>
          Filter Companies
        </Heading>
      </Box>
      <Select variant='filled' value={filter} onChange={handleFilterChange}>
        <option key='0' value='all'>
          All
        </option>
        <option key='1' value='active'>
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
