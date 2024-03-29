import { Flex, Spinner, Box, Heading } from '@chakra-ui/react';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import useGetOverviewData from '../hooks/useGetOverviewData';

const Overview = ({ filter }) => {
  const { isLoading, isError, data } = useGetOverviewData(filter);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <Box as='section'>
      <Heading
        textAlign='center'
        as='h3'
        size='md'
        opacity='.95'
        fontWeight='500'>
        Overview
      </Heading>
      <Flex direction='column'>
        <StatRow>
          <SimpleStat
            title='Total Per Hour'
            amount={data.totalTimeWorked ? data.totalPerHour.toFixed(2) : '-'}
            helpText='wages and tips'
            symbolBefore={data.totalTimeWorked ? '$' : null}
          />
          <SimpleStat
            title='Tip Amount Per Hour'
            amount={data.totalTimeWorked ? data?.tipPerHour?.toFixed(2) : '-'}
            helpText='after tipout'
            symbolBefore={data.totalTimeWorked ? '$' : null}
          />
          <SimpleStat
            title='tip Percentage'
            amount={
              data.totalTimeWorked ? (data?.tipPct * 100)?.toFixed(2) : '-'
            }
            helpText='per bill'
            symbolAfter={data.totalTimeWorked ? '%' : null}
          />
        </StatRow>
      </Flex>
    </Box>
  );
};
export default Overview;
