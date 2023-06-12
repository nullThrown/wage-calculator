import Week from 'features/entries/components/Week';
import Day from 'features/entries/components/Day';
import { useEffect, useState } from 'react';
import useGetEntriesByWeek from '../hooks/useGetWeeklyEntries';

const Entries = ({ filter }) => {
  const [date, setDate] = useState(
    new Date()
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-')
  );

  const { isLoading, isError, data } = useGetEntriesByWeek(date, filter);
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
