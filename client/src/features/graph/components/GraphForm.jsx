import { Box, HStack, Divider, Button } from '@chakra-ui/react';
import XAxisFilter from './XAxisFilter';
import ShiftTimeFilter from './ShiftTimeFilter';
import YAxisFilter from './YAxisFilter';

const GraphForm = ({
  graphFilters,
  handleShiftTimeChange,
  handleXAxisChange,
  handleYAxisChange,
}) => {
  return (
    <>
      <Divider m='.5em 0' />
      <Box as='form'>
        <HStack m='.5em 0 1em' height='5rem'>
          <XAxisFilter
            graphFilters={graphFilters}
            handleXAxisChange={handleXAxisChange}
          />
          <Divider orientation='vertical' />
          <ShiftTimeFilter
            graphFilters={graphFilters}
            handleShiftTimeChange={handleShiftTimeChange}
          />
          <Divider orientation='vertical' />
          <YAxisFilter
            graphFilters={graphFilters}
            handleYAxisChange={handleYAxisChange}
          />
        </HStack>
        <Button
          display='block'
          margin='0 auto'
          colorScheme='green'
          size='sm'
          type='submit'>
          Apply Changes
        </Button>
      </Box>
      <Divider m='.5em 0' />
    </>
  );
};

export default GraphForm;
