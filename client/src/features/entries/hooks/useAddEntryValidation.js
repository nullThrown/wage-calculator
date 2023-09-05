import { useEffect, useState } from 'react';

const useAddEntryValidation = (entryFormData) => {
  const { hoursWorked, minutesWorked } = entryFormData;

  const [isTimeWorkedZero, setIsTimeWorkedZero] = useState(false);

  useEffect(() => {
    if (hoursWorked + minutesWorked <= 0) {
      setIsTimeWorkedZero(true);
    } else {
      setIsTimeWorkedZero(false);
    }
  }, [hoursWorked, minutesWorked]);

  return { isTimeWorkedZero };
};

export default useAddEntryValidation;
