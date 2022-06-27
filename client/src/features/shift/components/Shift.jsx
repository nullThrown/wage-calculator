import { Flex } from '@chakra-ui/react';
import Card from 'components/base/Card';
import QuatHeading from 'components/typography/QuatHeading';
import TertHeading from 'components/typography/TertHeading';
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
