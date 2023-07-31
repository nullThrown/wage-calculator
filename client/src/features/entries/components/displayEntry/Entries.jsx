import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import { Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import DataDisplay from 'features/entries/components/displayEntry/DataDisplay';
import DataDisplayEmpty from 'features/entries/components/displayEntry/DataDisplayEmpty';
import filterEntriesByWeek from 'features/entries/helpers/filterEntriesByWeek/filterEntriesByWeek';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
import CustomDatePicker from 'components/inputs/DatePicker/CustomDatePicker';
import Week from 'features/entries/components/displayEntry/calendar/Week';
import Header from 'features/entries/components/displayEntry/calendar/Header';

const Entries = ({ filter }) => {
  const [date, setDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { isLoading, isError, entries } = useGetAllEntries(filter);
  const entriesByWeek = filterEntriesByWeek(date, entries);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <LargeCard as='section'>
      <TertHeading textAlign='center'>Entries</TertHeading>
      <Header>
        <CustomDatePicker date={date} setDate={setDate} />
      </Header>
      <Week
        entriesByWeek={entriesByWeek}
        setSelectedEntry={setSelectedEntry}
        date={date}
      />

      {selectedEntry ? (
        <DataDisplay selectedEntry={selectedEntry} />
      ) : (
        <DataDisplayEmpty />
      )}
    </LargeCard>
  );
};
export default Entries;
