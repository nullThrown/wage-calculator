import { Select, Flex, FormLabel } from '@chakra-ui/react';
export const CompanySelect = ({ onChange, companyId, companyList }) => {
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
