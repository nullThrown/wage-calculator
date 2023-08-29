import { Box, Text } from '@chakra-ui/react';
import '../calendar/calendar.css';
import ShiftInstance from '../ShiftInstance';
const Day = ({
  entries,
  dayName,
  dayNumber,
  containerClass,
  setSelectedEntry,
}) => {
  return (
    <Box
      flex='1 1 0px'
      padding='5px 0'
      className={`calendar__day--${containerClass}`}>
      <Box
        as='header'
        height='2em'
        paddingBottom='2.4em'
        borderBottom='1px solid rgb(40,40,40)'>
        <Text opacity='.8' fontSize='smaller' textTransform='uppercase'>
          {dayName}
        </Text>
      </Box>
      <Box height='8em'>
        <Text fontSize='1.4rem'>{dayNumber}</Text>
        {entries.map((entry) => (
          <ShiftInstance
            key={entry._id}
            entry={entry}
            setSelectedEntry={setSelectedEntry}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Day;
