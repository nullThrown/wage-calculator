import Card from '../base/Card';
import SecHeading from '../typography/SecHeading';
import TertHeading from '../typography/TertHeading';
import { Flex } from '@chakra-ui/react';
import StatRow from '../data/StatRow';
import SimpleStat from '../data/SimpleStat';

const Overview = () => {
  return (
    <Card as='section'>
      <SecHeading text='Overview' textAlign='center' />
      <Flex direction='column'>
        <TertHeading text='Averages' />
        <StatRow>
          <SimpleStat
            title='Total Per Hour'
            amount='17.56'
            helpText='wages and tips'
            symbolBefore='$'
          />
          <SimpleStat title='tip amt per hour' amount='15.34' symbolAfter='%' />
          <SimpleStat
            title='tip Percentage'
            amount='19'
            helpText='per bill'
            symbolAfter='%'
          />
          <SimpleStat
            title='True Tip Percentage'
            amount='16'
            helpText='after tipout'
            symbolAfter='%'
          />
        </StatRow>
      </Flex>
    </Card>
  );
};
export default Overview;
