import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import { Flex, useFocusEffect } from '@chakra-ui/react';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
import { useQuery } from 'react-query';
import { getOverviewData } from '../api/overview';
import { useEffect } from 'react';

const Overview = ({ filter }) => {
  const { isLoading, isError, data } = useQuery(
    ['entries', 'overview', filter],
    () => getOverviewData(filter)
  );

  // useEffect(() => {
  //   console.log(useOverview);
  // }, [useOverview]);

  return (
    <LargeCard as='section'>
      <TertHeading text='Overview' textAlign='center' />
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
