import { Divider, Flex, Grid, Center } from '@chakra-ui/react';
import TertHeading from '../typography/TertHeading';
import QuatHeading from '../typography/QuatHeading';
import NumInput from './NumInput';
import TimeInput from './TimeInput';
import ShiftRadioGroup from './Radio';
import Card from '../base/Card';
import SubmitEntry from '../button/SubmitEntry';
import CompanySelect from './CompanySelect';
import EditEntryBtn from '../button/EditEntry';
const AddEntryForm = ({ onToggle }) => {
  return (
    <Card as='form' m='1em 0 0 0'>
      <TertHeading text="Add Earning's Reports" textAlign='center' />
      <Flex m='1em' justify='center'>
        <EditEntryBtn />
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid
          gap='20px'
          templateColumns='repeat(2, 1fr)'
          w='100%'
          m='.4em 0'
          alignItems='start'>
          <TimeInput title='Regular Hours' name='hours-worked' />
          {/* <TimeInput title='Overtime Hours' name='overtime-hours' /> */}
          <NumInput title='Total Sales' name='total-sales' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Tips' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(4,1fr)' m='.4em 0'>
          <NumInput title='Credit Tips' name='credit-tips' />
          <NumInput title='Cash Tips' name='cash-tips' />
          <NumInput title='Tip Out' name='tip-out' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Shift' />
        <Divider mt='.2em' />
        <Grid
          gap='40px'
          templateColumns='repeat(2,1fr)'
          alignItems='center'
          m='.4em 0'>
          <ShiftRadioGroup />
          <CompanySelect />
        </Grid>
        <Divider />
      </Flex>
      <SubmitEntry onClick={onToggle} />
    </Card>
  );
};

export default AddEntryForm;
