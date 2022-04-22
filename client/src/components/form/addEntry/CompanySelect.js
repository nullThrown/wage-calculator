import { Select } from '@chakra-ui/react';
export const CompanySelect = ({ onChange, value }) => {
  return (
    <Select
      placeholder='Company'
      onChange={onChange}
      value={value}
      name='company'>
      <option value='Punch Bowl Social'>Punch Bowl Social</option>
      <option value='Target'>Target</option>
    </Select>
  );
};
export default CompanySelect;
