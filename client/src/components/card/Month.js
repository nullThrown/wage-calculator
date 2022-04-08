import Card from '../base/Card';
import SecHeading from '../typography/SecHeading';
import { Flex } from '@chakra-ui/react';
import StatRow from '../data/StatRow';
import SimpleStat from '../data/SimpleStat';
import TertHeading from '../typography/TertHeading';
const Month = () => {
  return (
    <Card as='section'>
      <SecHeading text='Month' textAlign='center' />
      <Flex direction='column'>
        <TertHeading text='Totals' />
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
        <TertHeading text='Averages' />
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
    </Card>
  );
};
export default Month;
