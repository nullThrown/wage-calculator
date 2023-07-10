import { useState, useEffect } from 'react';
import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import DateBox from './DateBox';
import WeekSelect from './WeekSelect';
import { HStack, Spinner } from '@chakra-ui/react';
import ErrorText from 'components/typography/ErrorText';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
// this whole state could be simplified with a useReducer fn
const Week = ({ filter, entries, isLoading, isError }) => {
  const [weekPairs, setWeekPairs] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedWeekData, setSelectedWeekData] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);

  const selectChangeHandler = (e) => setSelectedWeek(e.target.value);

  useEffect(() => {
    setWeekPairs(() => {
      return entries?.map((week) => {
        return week.datesShort;
      });
    });
  }, [entries]);

  useEffect(() => {
    setSelectedWeek(entries?.[0].datesShort);
  }, [entries]);

  useEffect(() => {
    setSelectedWeekData(() =>
      entries?.find((week) => week.datesShort === selectedWeek)
    );
  }, [selectedWeek]);

  useEffect(() => {
    setSelectedDays(() =>
      selectedWeekData?.weekOfDays?.map((day) => {
        const dayDate = new Date(day);
        dayDate.setUTCHours(5);
        return dayDate.getDate();
      })
    );
  }, [selectedWeekData]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <SomethingWentWrong />;
  }

  return (
    <LargeCard as='section'>
      <TertHeading textAlign='center'>Week</TertHeading>
      <WeekSelect
        selectChangeHandler={selectChangeHandler}
        selectedWeek={selectedWeek}
        weekPairs={weekPairs}
      />
      <HStack>
        {selectedDays?.map((day, i) => {
          const entriesByDay = selectedWeekData?.entries.filter((entry) => {
            const shiftDate = new Date(entry.shiftDate);
            return shiftDate.getDate() === day;
          });

          return <DateBox key={i} day={day} entries={entriesByDay} />;
        })}
      </HStack>
    </LargeCard>
  );
};

export default Week;
