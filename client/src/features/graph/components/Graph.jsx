import { Box, Heading } from '@chakra-ui/react';
import LineGraph from 'components/data/LineGraph';
import GraphForm from './GraphForm';
import bumpData from 'mock/bumpGraph';
import { useState } from 'react';

const initialFilterValue = {
  XAxis: 'byDay',
  shiftTime: false,
  YAxis: 'totalPerHour',
};

const Graph = () => {
  const [graphFilters, setGraphFilters] = useState(initialFilterValue);
  const handleShiftTimeChange = () => {
    setGraphFilters({ ...graphFilters, shiftTime: !graphFilters.shiftTime });
  };
  const handleXAxisChange = (e) => {
    setGraphFilters({ ...graphFilters, XAxis: e.target.value });
  };
  const handleYAxisChange = (value) => {
    setGraphFilters({ ...graphFilters, YAxis: value });
  };
  return (
    <Box maxW='34rem' height='24rem'>
      <Heading
        textAlign='center'
        as='h3'
        size='lg'
        opacity='.85'
        fontWeight='400'>
        Compare
      </Heading>
      <GraphForm
        graphFilters={graphFilters}
        handleShiftTimeChange={handleShiftTimeChange}
        handleXAxisChange={handleXAxisChange}
        handleYAxisChange={handleYAxisChange}
      />
      <LineGraph data={bumpData} />
    </Box>
  );
};

export default Graph;
