import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import { Spinner, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import DataDisplay from 'features/entries/components/displayEntry/DataDisplay';
import DataDisplayEmpty from 'features/entries/components/displayEntry/DataDisplayEmpty';
import DateBox from 'features/entries/components/displayEntry/DateBox';
import filterEntriesByWeek from 'features/entries/helpers/filterEntriesByWeek/filterEntriesByWeek';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
import CustomDatePicker from 'components/inputs/DatePicker/CustomDatePicker';

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

      <CustomDatePicker date={date} setDate={setDate} />

      <HStack>
        {entriesByWeek.map((day) => {
          return (
            <DateBox
              key={day.date}
              day={day.date.getDate()}
              entries={day.entries}
              setSelectedEntry={setSelectedEntry}
            />
          );
        })}
      </HStack>

      {selectedEntry ? (
        <DataDisplay selectedEntry={selectedEntry} />
      ) : (
        <DataDisplayEmpty />
      )}
    </LargeCard>
  );
};
export default Entries;
