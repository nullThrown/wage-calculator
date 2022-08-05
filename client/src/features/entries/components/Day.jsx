import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import QuatHeading from 'components/typography/QuatHeading';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react';
const Day = () => {
  return (
    <LargeCard as='section'>
      <TertHeading text='Single Entry' textAlign='center' />
      <Flex direction='column' mt='2em'>
        <TableContainer m='1em'>
          <Table>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Company</Th>
                <Th>Position</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>6-25-22</Td>
                <Td>Iron Cactus</Td>
                <Td>Server</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <QuatHeading text='Totals' />
        <StatRow>
          <SimpleStat title='Hours Worked' amount='6.54' />
          <SimpleStat title='Total Earned' amount='134.24' symbolBefore='$' />
          <SimpleStat
            title='Total Earned Per Hour'
            amount='23.45'
            symbolBefore='$'
          />
          <SimpleStat title='Wages' z amount='67.43' symbolBefore='$' />
        </StatRow>
        <QuatHeading text='Tips' />
        <StatRow>
          <SimpleStat
            title='Total Tips'
            amount='76.67'
            symbolBefore='$'
            helpText='after tipout'
          />
          <SimpleStat title='Credit Tips' amount='60.54' symbolBefore='$' />
          <SimpleStat title='Cash Tips' amount='16.13' symbolBefore='$' />
          <SimpleStat title='Tip Pct' amount='18' symbolAfter='%' />
        </StatRow>
      </Flex>
    </LargeCard>
  );
};
export default Day;
