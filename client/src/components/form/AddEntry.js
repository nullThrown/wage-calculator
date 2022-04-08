import { Box, Divider, Flex, Grid, GridItem, Button } from '@chakra-ui/react';
import SecHeading from '../typography/SecHeading';
import TertHeading from '../typography/TertHeading';
import NumInput from './NumInput';
import RadioGrp from './Radio';
import Card from '../base/Card';
const AddEntryForm = ({ onToggle }) => {
  return (
    <Card as='form' m='10px 0 0 0 '>
      <SecHeading text="Add Earning's Reports" />

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(3, 1fr)' w='100%' m='.4em 0'>
          <NumInput title='Hours Worked' name='hours-worked' />
          <NumInput title='Overtime Hours' name='overtime-hours' />
          <NumInput title='Total Sales' name='total-sales' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Tips' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(3,1fr)' m='.4em 0'>
          <NumInput title='Credit Tips' name='credit-tips' />
          <NumInput title='Cash Tips' name='cash-tips' />
          <NumInput title='Tip Out' name='tip-out' />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Shift' />
        <Divider mt='.2em' />
        <Flex align='center' w='100%' justify='space-around' m='.4em 0'>
          <RadioGrp />
        </Flex>
        <Divider />
      </Flex>
      <Button onClick={onToggle} colorScheme='green' m='2.6em auto 0'>
        Submit Entry
      </Button>
    </Card>
  );
};

export default AddEntryForm;
