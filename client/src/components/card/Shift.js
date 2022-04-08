import Card from '../base/Card';
import SecHeading from '../typography/SecHeading';
import { Flex } from '@chakra-ui/react';
import StatRow from '../data/StatRow';
import SimpleStat from '../data/SimpleStat';
import TertHeading from '../typography/TertHeading';

const Shift = () => {
  return (
    <Card as='section'>
      <SecHeading text='Shift' textAlign='center' />
      <Flex direction='column'>
        <TertHeading text='Totals' />
      </Flex>
    </Card>
  );
};
export default Shift;
