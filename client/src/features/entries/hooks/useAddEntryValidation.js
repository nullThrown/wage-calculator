import { useEffect, useState } from 'react';

const useAddEntryValidation = (newEntry) => {
  const { hoursWorked, minutesWorked } = newEntry;

  const [isTimeWorkedZero, setIsTimeWorkedZero] = useState(false);

  useEffect(() => {
    if (hoursWorked + minutesWorked < 0) {
      setIsTimeWorkedZero(true);
    } else {
      setIsTimeWorkedZero(true);
    }
  });

  return { isTimeWorkedZero };
};

export default useAddEntryValidation;
