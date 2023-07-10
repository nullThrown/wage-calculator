import Week from 'features/entries/components/week/Week';
import Day from 'features/entries/components/day/Day';
import { useState } from 'react';

const currentDate = new Date()
  .toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/\//g, '-');

const Entries = ({ filter }) => {
  const [date, setDate] = useState(currentDate);

  return (
    <>
      <Day filter={filter} />
      <Week filter={filter} date={date} />
    </>
  );
};

export default Entries;
