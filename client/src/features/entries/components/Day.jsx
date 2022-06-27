import Card from '../../../components/base/Card';
import TertHeading from '../../../components/typography/TertHeading';
import QuatHeading from '../../../components/typography/QuatHeading';
import { Flex } from '@chakra-ui/react';
import StatRow from '../../../components/data/StatRow';
import SimpleStat from '../../../components/data/SimpleStat';

const Day = () => {
  return (
    <Card as='section'>
      <TertHeading text='By Day' textAlign='center' />
      <Flex direction='column'>
        <QuatHeading text='Most Recent' />
        <StatRow>
          <SimpleStat title='Hours Worked' amount='6.54' />
          <SimpleStat title='Total Earned' amount='134.24' symbolBefore='$' />
          <SimpleStat title='Wages' z amount='67.43' symbolBefore='$' />
          <SimpleStat
            title='Total Tips'
            amount='76.67'
            symbolBefore='$'
            helpText='after tipout'
          />
        </StatRow>
        <QuatHeading text='Tips' />
        <StatRow>
          <SimpleStat title='Credit Tips' amount='60.54' symbolBefore='$' />
          <SimpleStat title='Cash Tips' amount='16.13' symbolBefore='$' />
          <SimpleStat title='Tip Pct' amount='18' symbolAfter='%' />
          <SimpleStat title='True Tip Pct' amount='16' symbolAfter='%' />
        </StatRow>
      </Flex>
    </Card>
  );
};
export default Day;
