import { useEffect, useReducer } from 'react';
import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import DateBox from './DateBox';
import WeekSelect from './WeekSelect';
import { HStack, Spinner } from '@chakra-ui/react';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import useGetEntriesByWeek from 'features/entries/hooks/useGetWeeklyEntries';
import formatReadableDate from 'util/formatReadableDate';
import weekDataReducer from 'features/entries/helpers/weekDataReducer';

const initialData = {
  weekDates: [],
  currentWeek: '',
  selectedWeekData: {},
};

const Week = ({ filter }) => {
  const { isLoading, isError, data } = useGetEntriesByWeek(filter, new Date());

  const [{ weekDates, currentWeek, selectedWeekData }, dispatch] = useReducer(
    weekDataReducer,
    initialData
  );

  const selectChangeHandler = (e) =>
    dispatch({
      type: 'switch_week',
      payload: { selectedWeek: e.target.value, data },
    });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'init_data', payload: data });
    }
  }, [data]);

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
        selectedWeek={currentWeek}
        weekPairs={weekDates}
      />
      <HStack>
        {selectedWeekData.weekOfDays?.map((day, i) => {
          const dayDate = formatReadableDate(day);
          const entriesByDay = selectedWeekData.entries.filter((entry) => {
            const shiftDate = formatReadableDate(entry.shiftDate);
            return shiftDate === dayDate;
          });

          return <DateBox key={i} day={dayDate} entries={entriesByDay} />;
        })}
      </HStack>
    </LargeCard>
  );
};

export default Week;
