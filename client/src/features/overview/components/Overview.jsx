import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import { Flex, Spinner } from '@chakra-ui/react';
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
    <LargeCard as='section'>
      <TertHeading textAlign='center'>Overview</TertHeading>
      <Flex direction='column'>
        <StatRow>
          <SimpleStat
            title='Total Per Hour'
            amount={data?.totalPerHour.toFixed(2)}
            helpText='wages and tips'
            symbolBefore='$'
          />
          <SimpleStat
            title='Tip Amount Per Hour'
            amount={data?.tipPerHour.toFixed(2)}
            helpText='after tipout'
            symbolBefore='$'
          />
          <SimpleStat
            title='tip Percentage'
            amount={(data?.tipPct * 100).toFixed(2)}
            helpText='per bill'
            symbolAfter='%'
          />
        </StatRow>
      </Flex>
    </LargeCard>
  );
};
export default Overview;
