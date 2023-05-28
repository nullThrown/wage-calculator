import { Select } from '@chakra-ui/react';
export const CompanySelect = ({ onChange, companyId, companyList }) => {
  return (
    <Select onChange={onChange} value={companyId} name='company'>
      {companyList.map((company) => {
        return (
          <option key={company._id} value={company._id}>
            {company.name}
          </option>
        );
      })}
    </Select>
  );
};
export default CompanySelect;
