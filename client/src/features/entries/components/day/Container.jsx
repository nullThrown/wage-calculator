import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import SelectedEntryBtn from './SelectedEntryBtn';
const Container = ({ filteredEntries, selectedEntry, setSelectedEntry }) => {
  const selectedEntriesIsEmpty = filteredEntries.length === 0;
  return (
    <Box>
      <Text>Entries on this day</Text>
      {selectedEntriesIsEmpty ? (
        <Text>No entries on this particular date</Text>
      ) : (
        <VStack>
          {filteredEntries.map((entry) => (
            <SelectedEntryBtn
              key={entry._id}
              setSelectedEntry={setSelectedEntry}
              entry={entry}
              selectedEntry={selectedEntry}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Container;
