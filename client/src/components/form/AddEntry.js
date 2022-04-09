import { Divider, Flex, Grid } from '@chakra-ui/react';
import TertHeading from '../typography/TertHeading';
import QuatHeading from '../typography/QuatHeading';
import NumInput from './NumInput';
import RadioGrp from './Radio';
import Card from '../base/Card';
import SubmitEntry from '../button/SubmitEntry';

const AddEntryForm = ({ onToggle }) => {
  return (
    <Card as='form' m='1em 0 0 0'>
      <TertHeading text="Add Earning's Reports" textAlign='center' />

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(3, 1fr)' w='100%' m='.4em 0'>
          <NumInput title='Hours Worked' name='hours-worked' />
          <NumInput title='Overtime Hours' name='overtime-hours' />
          <NumInput title='Total Sales' name='total-sales' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Tips' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(3,1fr)' m='.4em 0'>
          <NumInput title='Credit Tips' name='credit-tips' />
          <NumInput title='Cash Tips' name='cash-tips' />
          <NumInput title='Tip Out' name='tip-out' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Shift' />
        <Divider mt='.2em' />
        <Flex align='center' w='100%' justify='space-around' m='.4em 0'>
          <RadioGrp />
        </Flex>
        <Divider />
      </Flex>
      <SubmitEntry onClick={onToggle} />
    </Card>
  );
};

export default AddEntryForm;
