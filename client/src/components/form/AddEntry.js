import { Box, Divider, Flex } from '@chakra-ui/react';
import SecHeading from '../typography/SecHeading';
import TertHeading from '../typography/TertHeading';
import NumInput from './NumInput';
const AddEntryForm = () => {
  return (
    <Box
      as='form'
      w='80%'
      textAlign='center'
      border='1px solid rgba(100,100,230, .6)'
      borderRadius={10}
      p='2em'>
      <SecHeading text="Add Earning's Reports" />

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Totals' />
        <Divider mb='.5em' />
        <Flex justify='space-around' w='100%'>
          <NumInput title='Hours Worked' name='hours-worked' />
          <NumInput title='Total Sales' name='total-sales' isRequired={true} />
        </Flex>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Tips' />
        <Divider mb='.5em' />
        <Flex justify='center'>
          <NumInput title='Credit Tips' name='credit-tips' />
          <NumInput title='Cash Tips' name='cash-tips' />
          <NumInput title='Tip Out' name='tip-out' />
        </Flex>
        <Divider />
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
        <TertHeading text='Tips' />
        <Divider mb='.5em' />
        <NumInput title='Credit Tips' name='credit-tips' />
        <NumInput title='Cash Tips' name='cash-tips' />
        <NumInput title='Tip Out' name='tip-out' />
        <Divider />
      </Flex>
    </Box>
  );
};

export default AddEntryForm;
