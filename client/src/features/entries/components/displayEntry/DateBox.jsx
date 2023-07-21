import { Box } from '@chakra-ui/react';
import ShiftInstance from 'features/entries/components/displayEntry/ShiftInstance';

const DateBox = ({ day, entries, setSelectedEntry }) => {
  return (
    <Box w='120px' h='120px' border='1px solid gray' borderRadius='3px'>
      {day}
      {entries.map((entry) => (
        <ShiftInstance
          key={entry._id}
          entry={entry}
          setSelectedEntry={setSelectedEntry}
        />
      ))}
    </Box>
  );
};

export default DateBox;
