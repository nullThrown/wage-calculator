import { StatGroup, Divider } from '@chakra-ui/react';
const StatRow = ({ children }) => {
  return (
    <StatGroup display='flex' align='center' mb='1em'>
      <Divider m='.5em 0' />
      {children}
    </StatGroup>
  );
};
export default StatRow;
