import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
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
  Spinner,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useState, useMemo } from 'react';
import useGetAllEntries from '../../hooks/useGetAllEntries';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import filterEntriesByDate from '../../helpers/filterEntriesByDate';
import Container from './Container';
import DataDisplayEmpty from './DataDisplayEmpty';
import DataDisplay from './DataDisplay';

const Day = ({ filter }) => {
  const [date, setDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { isLoading, isError, entries } = useGetAllEntries(filter);

  let filteredEntries = useMemo(
    () => filterEntriesByDate(entries, date),
    [entries, date]
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <LargeCard as='section'>
      <TertHeading textAlign='center'>Single Entry</TertHeading>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        maxDate={new Date()}></DatePicker>
      <Container
        filteredEntries={filteredEntries}
        setSelectedEntry={setSelectedEntry}
        selectedEntry={selectedEntry}
      />
      {selectedEntry ? (
        <DataDisplay selectedEntry={selectedEntry} />
      ) : (
        <DataDisplayEmpty />
      )}
    </LargeCard>
  );
};
export default Day;
