import Week from 'features/entries/components/Week';
import Day from 'features/entries/components/Day';
import { useState } from 'react';

const Entries = ({ filter }) => {
  const [date, getDate] = useState(
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );
  return (
    <>
      <Day filter={filter} date={date} />
      <Week filter={filter} date={date} />
    </>
  );
};

export default Entries;
