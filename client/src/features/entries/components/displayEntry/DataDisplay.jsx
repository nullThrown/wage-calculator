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
import formatReadableDate from 'util/formatReadableDate';

const DataDisplay = ({ selectedEntry }) => {
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
              <Td>{formatReadableDate(selectedEntry.shiftDate)}</Td>
              <Td>{selectedEntry.company}</Td>
              <Td>{selectedEntry?.position}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <QuatHeading text='Totals' />
      <StatRow>
        <SimpleStat
          title='Hours Worked'
          amount={selectedEntry?.timeWorkedDec}
        />
        <SimpleStat
          title='Total Earned'
          amount={selectedEntry.trueTotalEarned}
          symbolBefore='$'
        />
        <SimpleStat
          title='Total Earned Per Hour'
          amount={selectedEntry.totalEarnedPerHour}
          symbolBefore='$'
        />
        <SimpleStat
          title='Wages'
          z
          amount={selectedEntry.totalWages}
          symbolBefore='$'
        />
      </StatRow>
      <QuatHeading text='Tips' />
      <StatRow>
        <SimpleStat
          title='Total Tips'
          amount={selectedEntry.trueTotalTips}
          symbolBefore='$'
          helpText='after tipout'
        />
        <SimpleStat
          title='Credit Tips'
          amount={selectedEntry.creditTips}
          symbolBefore='$'
        />
        <SimpleStat
          title='Cash Tips'
          amount={selectedEntry.cashTips}
          symbolBefore='$'
        />
        <SimpleStat
          title='Tip Pct'
          amount={(selectedEntry.tipPct * 100).toFixed(2)}
          symbolAfter='%'
          helpText='before tipout'
        />
      </StatRow>
    </Flex>
  );
};

export default DataDisplay;
