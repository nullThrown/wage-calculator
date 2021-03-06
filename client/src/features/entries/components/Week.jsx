import { useState, useEffect } from 'react';
import Card from 'components/base/Card';
import TertHeading from 'components/typography/TertHeading';
import DateBox from './DateBox';
import WeekSelect from './WeekSelect';
import { weekData } from './weekData';
import { HStack } from '@chakra-ui/react';
import EntryDisplay from 'features/entries/components/EntryDisplay';

const Week = () => {
  const [weekPairs, setWeekPairs] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedWeekData, setSelectedWeekData] = useState({});

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
    <Card as='section'>
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
    </Card>
  );
};

export default Week;
