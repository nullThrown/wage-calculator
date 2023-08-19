import { Box, Heading, Spinner } from '@chakra-ui/react';
import LineGraph from 'components/data/LineGraph';
import GraphForm from './GraphForm';
import { useState } from 'react';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
import selectGraphDataGenerator from 'features/graph/helpers/selectGraphDataGenerator';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';

const initialFilterValue = {
  XAxis: 'byDay',
  shiftTime: false,
  YAxis: 'totalPerHour',
};

const Graph = ({ filter }) => {
  const [graphFilters, setGraphFilters] = useState(initialFilterValue);

  const { isLoading, isError, entries } = useGetAllEntries(filter);

  const graphDataGenerator = selectGraphDataGenerator(entries, graphFilters);

  const graphData = graphDataGenerator(entries);

  const handleXAxisChange = (e) => {
    setGraphFilters({ ...graphFilters, XAxis: e.target.value });
  };
  const handleShiftTimeChange = () => {
    setGraphFilters({ ...graphFilters, shiftTime: !graphFilters.shiftTime });
  };
  const handleYAxisChange = (value) => {
    setGraphFilters({ ...graphFilters, YAxis: value });
  };
  if (isLoading) {
    return (
      <Box maxW='34rem' height='24rem'>
        <Spinner />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box maxW='34rem' height='24rem'>
        <SomethingWentWrong />
      </Box>
    );
  }
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
      <LineGraph data={graphData} />
    </Box>
  );
};

export default Graph;
