import { Box } from '@chakra-ui/react';
import EntryDisplay from 'features/entries/components/EntryDisplay';

const DateBox = ({ day, entries }) => {
  console.log(entries);
  return (
    <Box w='120px' h='120px' border='1px solid gray' borderRadius='3px'>
      {day}
      {entries.map((entry) => (
        <EntryDisplay entry={entry} />
      ))}
    </Box>
  );
};

export default DateBox;
