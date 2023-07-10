import QuatHeading from 'components/typography/QuatHeading';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from '@chakra-ui/react';

const DataDisplayEmpty = () => {
  return (
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
              <Td>-</Td>
              <Td>-</Td>
              <Td>-</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <QuatHeading text='Totals' />
      <StatRow>
        <SimpleStat title='Hours Worked' amount='-' />
        <SimpleStat title='Total Earned' amount='-' />
        <SimpleStat title='Total Earned Per Hour' amount='-' />
        <SimpleStat title='Wages' z amount='-' />
      </StatRow>
      <QuatHeading text='Tips' />
      <StatRow>
        <SimpleStat title='Total Tips' amount='-' helpText='after tipout' />
        <SimpleStat title='Credit Tips' amount='-' />
        <SimpleStat title='Cash Tips' amount='-' />
        <SimpleStat title='Tip Pct' amount='-' />
      </StatRow>
    </Flex>
  );
};

export default DataDisplayEmpty;
