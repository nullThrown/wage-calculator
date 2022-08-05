import { Flex } from '@chakra-ui/react';
import LargeCard from 'components/card/LargeCard';
import QuatHeading from 'components/typography/QuatHeading';
import TertHeading from 'components/typography/TertHeading';
const Shift = () => {
  return (
    <LargeCard as='section'>
      <TertHeading text='Shift' textAlign='center' />
      <Flex direction='column'>
        <QuatHeading text='Totals' />
      </Flex>
    </LargeCard>
  );
};
export default Shift;
