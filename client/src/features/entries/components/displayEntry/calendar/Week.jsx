import Day from 'features/entries/components/displayEntry/calendar/Day';
import { HStack, Box } from '@chakra-ui/react';
const Week = ({ entriesByWeek, setSelectedEntry, date }) => {
  return (
    <Box as='section' maxW='55rem'>
      <HStack width='100%' spacing='1em'>
        {entriesByWeek.map((day) => {
          const dayShort = day.date.toLocaleDateString('en-US', {
            weekday: 'short',
          });
          let containerClass = '';
          if (day.entries.length === 0) containerClass = 'empty';
          if (day.date.getDate() === date.getDate()) {
            containerClass = 'selected';
          }
          return (
            <Day
              key={day.date.getDate()}
              entries={day.entries}
              dayName={dayShort}
              dayNumber={day.date.getDate()}
              containerClass={containerClass}
              setSelectedEntry={setSelectedEntry}
            />
          );
        })}
      </HStack>
    </Box>
  );
};

export default Week;
