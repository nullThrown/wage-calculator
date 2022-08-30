import { useState, useEffect } from 'react';
import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import DateBox from './DateBox';
import WeekSelect from './WeekSelect';
import { weekData } from './weekData';
import { HStack } from '@chakra-ui/react';
import EntryDisplay from 'features/entries/components/EntryDisplay';
import { useQuery } from 'react-query';
import { getEntriesByWeek } from '../api/entries';

const Week = ({ filter }) => {
  const [weekPairs, setWeekPairs] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedWeekData, setSelectedWeekData] = useState({});

  // const { isLoading, error, data } = useQuery(
  //   ['entries', 'week', 'today', filter],
  //   getEntriesByWeek('today', filter)
  // );

  const selectChangeHandler = (e) => setSelectedWeek(e.target.value);

  useEffect(() => {
    setWeekPairs(() => {
      return weekData.map((week) => {
        return week.datesShort;
      });
    });
  }, [weekData]);

  useEffect(() => {
    setSelectedWeek(weekData[0].datesShort);
  }, [weekData]);

  useEffect(() => {
    setSelectedWeekData(() =>
      weekData.find((week) => week.datesShort === selectedWeek)
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

  return (
    <LargeCard as='section'>
      <TertHeading text='Week' textAlign='center' />
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
