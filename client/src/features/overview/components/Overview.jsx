import LargeCard from 'components/card/LargeCard';
import TertHeading from 'components/typography/TertHeading';
import QuatHeading from 'components/typography/QuatHeading';
import { Flex } from '@chakra-ui/react';
import StatRow from 'components/data/StatRow';
import SimpleStat from 'components/data/SimpleStat';

const Overview = () => {
  return (
    <LargeCard as='section'>
      <TertHeading text='Overview' textAlign='center' />
      <Flex direction='column'>
        <StatRow>
          <SimpleStat
            title='Total Per Hour'
            amount='17.56'
            helpText='wages and tips'
            symbolBefore='$'
          />
          <SimpleStat
            title='Tip Amount Per Hour'
            amount='16'
            helpText='after tipout'
            symbolBefore='$'
          />
          <SimpleStat
            title='tip Percentage'
            amount='19'
            helpText='per bill'
            symbolAfter='%'
          />
        </StatRow>
      </Flex>
    </LargeCard>
  );
};
export default Overview;
