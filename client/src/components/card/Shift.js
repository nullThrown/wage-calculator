import { Flex } from '@chakra-ui/react';
import Card from '../base/Card';
import TertHeading from '../typography/TertHeading';
import QuatHeading from '../typography/QuatHeading';
const Shift = () => {
  return (
    <Card as='section'>
      <TertHeading text='Shift' textAlign='center' />
      <Flex direction='column'>
        <QuatHeading text='Totals' />
      </Flex>
    </Card>
  );
};
export default Shift;
