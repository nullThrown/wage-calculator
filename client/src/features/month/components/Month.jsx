import { Flex } from '@chakra-ui/react';
import LargeCard from 'components/card/LargeCard';
import QuatHeading from 'components/typography/QuatHeading';
import TertHeading from 'components/typography/TertHeading';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
import { getEntryDataByMonth } from '../api/month';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { getMonth } from 'date-fns';

const Month = ({ filter }) => {
  const { isLoading, isError, data } = useQuery(
    ['entries', 'data', 2022, 7, filter],
    () => getEntryDataByMonth(2022, 8, filter)
  );

  return (
    <LargeCard as='section'>
      <TertHeading text='Month' textAlign='center' />
      <Flex direction='column'>
        <QuatHeading text='Totals' />
        <StatRow>
          <SimpleStat
            title='Total Earned'
            amount={data.trueTotalEarned.toFixed(2)}
            helpText='wages and tips'
          />
          <SimpleStat
            title='Wages Earned'
            amount={data.totalWages.toFixed(2)}
          />
          <SimpleStat title='Credit Tips' amount={data.creditTips.toFixed(2)} />
          <SimpleStat title='Cash Tips' amount={data.cashTips.toFixed(2)} />
        </StatRow>
      </Flex>
      <Flex direction='column'>
        <QuatHeading text='Averages' />
        <StatRow title='Totals'>
          <SimpleStat
            title='Total Avg. Per Hour'
            symbolBefore='$'
            amount={data.totalPerHour.toFixed(2)}
            helpText='wages and tips'
          />
          <SimpleStat
            title='Avg. tip per hour'
            symbol='$'
            amount={data.tipPerHour.toFixed(2)}
          />
          <SimpleStat
            title='Avg. tip percentage'
            symbolAfter='%'
            amount={(data.tipPct * 100).toFixed(2)}
          />
          <SimpleStat title='Cash Tips' />
        </StatRow>
      </Flex>
    </LargeCard>
  );
};
export default Month;
