import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import { Spinner, HStack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import DataDisplay from 'features/entries/components/day/DataDisplay';
import DataDisplayEmpty from 'features/entries/components/day/DataDisplayEmpty';
import useGetEntriesByWeek from 'features/entries/hooks/useGetWeeklyEntries';
import formatReadableDate from 'util/formatReadableDate';
import DateBox from 'features/entries/components/week/DateBox';
import selectWeekData from 'features/entries/helpers/selectWeekData';

const currentDate = new Date();

const Entries = ({ filter }) => {
  const [date, setDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { isLoading, isError, data } = useGetEntriesByWeek(filter, currentDate);

  const selectedWeekData = selectWeekData(date, data);
  useEffect(() => {
    console.log(selectedEntry);
  }, [selectedEntry]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <LargeCard as='section'>
      <TertHeading textAlign='center'>Entries</TertHeading>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        maxDate={new Date()}></DatePicker>

      <HStack>
        {selectedWeekData.weekOfDays?.map((day, i) => {
          const dayDate = formatReadableDate(day);
          const entriesByDay = selectedWeekData.entries.filter((entry) => {
            const shiftDate = formatReadableDate(entry.shiftDate);
            return shiftDate === dayDate;
          });

          return (
            <DateBox
              key={day}
              day={dayDate}
              entries={entriesByDay}
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
