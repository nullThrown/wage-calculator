import { Select } from '@chakra-ui/react';
export const CompanySelect = ({ onChange, value }) => {
  return (
    <Select
      placeholder='Company'
      onChange={onChange}
      value={value}
      name='company'>
      <option value='Iron Cactus'>Iron Cactus</option>
      <option value="Muade's">Maude's</option>
      <option value='Luckies'>Luckies</option>
    </Select>
  );
};
export default CompanySelect;
