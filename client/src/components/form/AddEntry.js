import { Box, Divider, Flex, Grid, GridItem, Button } from '@chakra-ui/react';
import SecHeading from '../typography/SecHeading';
import TertHeading from '../typography/TertHeading';
import NumInput from './NumInput';
import RadioGrp from './Radio';
import BrunchSwitch from './BrunchSwitch';

const AddEntryForm = ({ onToggle }) => {
  return (
    <Box
      as='form'
      maxW='640px'
      w='100%'
      mt='10px'
      textAlign='center'
      boxShadow='5px 5px 10px rgba(220,220,220,1.0)'
      borderRadius={10}
      p='2em'>
      <SecHeading text="Add Earning's Reports" />

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid gap='21px' templateColumns='repeat(2, 1fr)' w='100%' m='.4em 0'>
          <GridItem>
            <NumInput title='Hours Worked' name='hours-worked' />
          </GridItem>
          <GridItem>
            <NumInput
              title='Total Sales'
              name='total-sales'
              isRequired={true}
            />
          </GridItem>
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
          <BrunchSwitch />
        </Flex>
        <Divider />
        <Button onClick={onToggle} colorScheme='green' m='2.6em auto 0'>
          Submit Entry
        </Button>
      </Flex>
    </Box>
  );
};

export default AddEntryForm;
