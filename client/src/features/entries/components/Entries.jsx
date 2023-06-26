import Week from 'features/entries/components/Week';
import Day from 'features/entries/components/Day';
import { useState } from 'react';
import useGetEntriesByWeek from '../hooks/useGetWeeklyEntries';

const currentDate = new Date()
  .toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/\//g, '-');

const Entries = ({ filter }) => {
  const [date, setDate] = useState(currentDate);

  const { isLoading, isError, data } = useGetEntriesByWeek(filter, date);
  return (
    <>
      <Day
        filter={filter}
        entries={data}
        isLoading={isLoading}
        isError={isError}
      />
      <Week
        filter={filter}
        isLoading={isLoading}
        isError={isError}
        entries={data}
        date={date}
      />
    </>
  );
};

export default Entries;
