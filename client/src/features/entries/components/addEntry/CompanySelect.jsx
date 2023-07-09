import { Select, Flex, FormLabel } from '@chakra-ui/react';
import useGetCompanies from 'features/company/hooks/useGetCompanies';
import { Spinner } from '@chakra-ui/react';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';

export const CompanySelect = ({ onChange, companyId }) => {
  const { isLoading, isError, companyList } = useGetCompanies();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <Flex flexDirection='column' mr='2em'>
      <FormLabel opacity='.85'>Company</FormLabel>
      <Select mt='.4em' onChange={onChange} value={companyId} name='company'>
        {companyList.map((company) => {
          return (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};
export default CompanySelect;
