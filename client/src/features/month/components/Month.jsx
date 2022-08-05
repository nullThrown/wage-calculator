import { Flex } from '@chakra-ui/react';
import LargeCard from 'components/card/LargeCard';
import QuatHeading from 'components/typography/QuatHeading';
import TertHeading from 'components/typography/TertHeading';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';
const Month = () => {
  return (
    <LargeCard as='section'>
      <TertHeading text='Month' textAlign='center' />
      <Flex direction='column'>
        <QuatHeading text='Totals' />
        <StatRow>
          <SimpleStat
            title='Total Earned'
            amount='2465.96'
            helpText='wages and tips'
          />
          <SimpleStat title='Wages Earned' amount='1232.34' />
          <SimpleStat title='Credit Tips' amount='1000.34' />
          <SimpleStat title='Cash Tips' amount='232.34' />
        </StatRow>
      </Flex>
      <Flex direction='column'>
        <QuatHeading text='Averages' />
        <StatRow title='Totals'>
          <SimpleStat
            title='Total Avg. Per Hour'
            symbolBefore='$'
            amount='21.56'
            helpText='wages and tips'
          />
          <SimpleStat title='Avg. tip per hour' symbol='$' amount='7.23' />
          <SimpleStat title='Avg. tip percentage' symbol='%' amount='19' />
          <SimpleStat title='Cash Tips' amount='232.34' />
        </StatRow>
      </Flex>
    </LargeCard>
  );
};
export default Month;
